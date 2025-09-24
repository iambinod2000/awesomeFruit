import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useCustomers } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { customers } = useCustomers();

  // Find current user's profile to get customer_id for filtering orders
  const currentUserProfile = customers.find(customer => customer.user_id === user?.id);
  
  // Filter orders to show only current user's orders
  const customerOrders = orders.filter(order => 
    order.customer_id === currentUserProfile?.id || 
    order.customer_email === user?.email
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">My Orders</h1>
                <p className="text-sm text-muted-foreground">View and track all your orders</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>All your orders and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="text-center py-8">Loading your orders...</div>
            ) : customerOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start shopping to see your orders here
                </p>
                <Link to="/products">
                  <Button className="btn-hero">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.order_number}
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(order.total_amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {getStatusDisplay(order.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Need to place a new order?
          </p>
          <Link to="/products">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Orders;