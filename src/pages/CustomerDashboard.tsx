import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useCustomers } from '@/hooks/useCustomers';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, ShoppingCart, Heart, Package, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewForm from '@/components/ReviewForm';

const CustomerDashboard = () => {
  const { user, signOut } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { customers } = useCustomers();
  const { favorites } = useFavorites();

  // Find current user's profile to get customer_id for filtering orders
  const currentUserProfile = customers.find(customer => customer.user_id === user?.id);
  
  // Filter orders to show only current user's orders
  const customerOrders = orders.filter(order => 
    order.customer_id === currentUserProfile?.id || 
    order.customer_email === user?.email
  );

  const activeOrders = customerOrders.filter(order => 
    order.status === 'pending' || order.status === 'processing'
  ).length;

  const recentOrders = customerOrders.slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'processing': return 'In Transit';
      case 'pending': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Customer Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage your orders and explore fresh fruits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-3">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>View and track your recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {ordersLoading ? 'Loading...' : `${activeOrders} Active Orders`}
                </Badge>
                <Link to="/orders">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Favorites</CardTitle>
              <CardDescription>Your favorite fruits and products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{favorites.length} Items</Badge>
                <Link to="/favorites">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3">
                <Package className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Shop Now</CardTitle>
              <CardDescription>Browse our fresh fruit collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/products">
                <Button className="w-full btn-hero">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest orders and activities</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="text-center py-4">Loading recent activity...</div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No recent orders. <Link to="/products" className="text-primary hover:underline">Start shopping!</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">Order #{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(order.total_amount)} • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {getStatusDisplay(order.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <ReviewForm />
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;