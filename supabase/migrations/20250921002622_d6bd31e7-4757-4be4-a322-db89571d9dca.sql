-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for customer data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id),
  customer_email TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (admin can manage all, users can view)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@alluring.com'
  )
);

-- RLS Policies for profiles (users can manage their own, admins can see all)
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@alluring.com'
  )
);

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@alluring.com'
  )
);

-- RLS Policies for orders (customers can see their own, admins can see all)
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (
  customer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@alluring.com'
  )
);

CREATE POLICY "Authenticated users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@alluring.com'
  )
);

-- RLS Policies for order_items (inherit from orders)
CREATE POLICY "Users can view order items for their orders" ON public.order_items FOR SELECT USING (
  order_id IN (
    SELECT id FROM public.orders WHERE 
    customer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email LIKE '%@alluring.com'
    )
  )
);

CREATE POLICY "Authenticated users can create order items" ON public.order_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage all order items" ON public.order_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@alluring.com'
  )
);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.products (name, description, price, category, stock_quantity, image_url) VALUES
('Fresh Apples', 'Crispy red apples from local orchards', 3.99, 'Fruits', 150, '/placeholder.svg'),
('Organic Bananas', 'Sweet organic bananas', 2.49, 'Fruits', 200, '/placeholder.svg'),
('Premium Oranges', 'Juicy Valencia oranges', 4.99, 'Fruits', 100, '/placeholder.svg'),
('Mixed Berry Box', 'Fresh strawberries, blueberries, and raspberries', 8.99, 'Fruits', 50, '/placeholder.svg'),
('Tropical Mango', 'Sweet tropical mangoes', 5.99, 'Fruits', 75, '/placeholder.svg');

-- Insert sample profiles
INSERT INTO public.profiles (first_name, last_name, email, phone, address) VALUES
('John', 'Doe', 'customer@example.com', '+1234567890', '123 Main St, City, State'),
('Jane', 'Smith', 'user@example.com', '+1987654321', '456 Oak Ave, Town, State'),
('Bob', 'Johnson', 'buyer@example.com', '+1122334455', '789 Pine Rd, Village, State');

-- Insert sample orders
INSERT INTO public.orders (order_number, customer_id, customer_email, total_amount, status) VALUES
('ORD-12345', (SELECT id FROM public.profiles WHERE email = 'customer@example.com'), 'customer@example.com', 45.99, 'processing'),
('ORD-12344', (SELECT id FROM public.profiles WHERE email = 'user@example.com'), 'user@example.com', 32.50, 'completed'),
('ORD-12343', (SELECT id FROM public.profiles WHERE email = 'buyer@example.com'), 'buyer@example.com', 78.25, 'pending');

-- Insert sample order items
INSERT INTO public.order_items (order_id, product_id, product_name, quantity, price) VALUES
((SELECT id FROM public.orders WHERE order_number = 'ORD-12345'), (SELECT id FROM public.products WHERE name = 'Fresh Apples'), 'Fresh Apples', 2, 3.99),
((SELECT id FROM public.orders WHERE order_number = 'ORD-12345'), (SELECT id FROM public.products WHERE name = 'Mixed Berry Box'), 'Mixed Berry Box', 4, 8.99),
((SELECT id FROM public.orders WHERE order_number = 'ORD-12344'), (SELECT id FROM public.products WHERE name = 'Organic Bananas'), 'Organic Bananas', 3, 2.49),
((SELECT id FROM public.orders WHERE order_number = 'ORD-12343'), (SELECT id FROM public.products WHERE name = 'Premium Oranges'), 'Premium Oranges', 5, 4.99);