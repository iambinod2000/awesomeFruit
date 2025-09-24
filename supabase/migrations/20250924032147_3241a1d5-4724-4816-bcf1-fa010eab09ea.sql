-- Fix RLS policies to use the is_admin() function consistently

-- Drop and recreate the orders policies
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders 
FOR SELECT USING (
  (customer_id IN (SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()))
  OR public.is_admin()
);

-- Drop and recreate the profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles 
FOR SELECT USING (
  (auth.uid() = user_id) OR public.is_admin()
);