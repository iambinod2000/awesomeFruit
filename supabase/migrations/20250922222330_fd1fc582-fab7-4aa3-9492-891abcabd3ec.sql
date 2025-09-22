-- Fix admin detection by creating a helper function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email LIKE '%@alluring.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update profiles RLS policies with simplified admin check
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (public.is_admin());

-- Update orders RLS policies 
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
CREATE POLICY "Admins can manage all orders" 
ON public.orders 
FOR ALL 
USING (public.is_admin());

-- Update order_items RLS policies
DROP POLICY IF EXISTS "Admins can manage all order items" ON public.order_items;
CREATE POLICY "Admins can manage all order items" 
ON public.order_items 
FOR ALL 
USING (public.is_admin());

-- Update products RLS policies
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (public.is_admin());

-- Grant necessary permissions to authenticated users for the admin function
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;