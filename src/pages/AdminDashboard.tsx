import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';
import { useCustomers } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, Package, Users, BarChart3, LogOut } from 'lucide-react';
import ProductManagement from '@/components/ProductManagement';
import CustomerManagement from '@/components/CustomerManagement';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const { orders, getRecentOrders, getOrderStats, updateOrderStatus, loading: ordersLoading } = useOrders();
  const { customers, getCustomerStats, loading: customersLoading } = useCustomers();
  const [activeDialog, setActiveDialog] = useState<'products' | 'customers' | null>(null);

  const handleSignOut = async () => {
    await signOut();
  };

  const productStats = {
    total: products.length,
    lowStock: products.filter(p => p.stock_quantity <= 10).length
  };

  const customerStats = getCustomerStats();
  const orderStats = getOrderStats();
  const recentOrders = getRecentOrders(5);

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

  const handleUpdateOrderStatus = async (orderId: string, newStatus: any) => {
    await updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-destructive rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Administrator: {user?.email}</p>
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
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage products, orders, and customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-3">
                <Package className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage fruit inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{productStats.total} Items</Badge>
                {productStats.lowStock > 0 && (
                  <Badge variant="destructive">{productStats.lowStock} Low Stock</Badge>
                )}
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setActiveDialog('products')}
                disabled={productsLoading}
              >
                Manage Products
              </Button>
            </CardContent>
          </Card>

          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Customers</CardTitle>
              <CardDescription>User management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{customerStats.totalCustomers} Users</Badge>
                {customerStats.newToday > 0 && (
                  <Badge variant="secondary">+{customerStats.newToday} Today</Badge>
                )}
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setActiveDialog('customers')}
                disabled={customersLoading}
              >
                View Customers
              </Button>
            </CardContent>
          </Card>

          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Sales and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{formatCurrency(orderStats.totalRevenue)}</Badge>
                <Badge className="bg-green-500">{orderStats.completedOrders} Orders</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-semibold">{orderStats.pendingOrders}</div>
                  <div className="text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-semibold">{orderStats.processingOrders}</div>
                  <div className="text-muted-foreground">Processing</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-center py-4">Loading orders...</div>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">No recent orders</div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">Order #{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer_email} • {formatCurrency(order.total_amount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {order.status}
                        </Badge>
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                          >
                            Process
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Product Management Dialog */}
        <Dialog open={activeDialog === 'products'} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Management</DialogTitle>
              <DialogDescription>Manage your product inventory</DialogDescription>
            </DialogHeader>
            <ProductManagement />
          </DialogContent>
        </Dialog>

        {/* Customer Management Dialog */}
        <Dialog open={activeDialog === 'customers'} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Customer Management</DialogTitle>
              <DialogDescription>View and manage customer information</DialogDescription>
            </DialogHeader>
            <CustomerManagement />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;