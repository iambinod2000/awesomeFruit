-- Fix the search path for the is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email LIKE '%@alluring.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;