import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Package, Users, BarChart3, Settings, LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
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
          <p className="text-muted-foreground">Manage products, orders, and users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <Badge variant="outline">45 Items</Badge>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full" variant="outline">
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
                <Badge variant="outline">234 Users</Badge>
                <Badge variant="secondary">+12 Today</Badge>
              </div>
              <Button className="w-full" variant="outline">
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
                <Badge variant="outline">$12,456</Badge>
                <Badge className="bg-green-500">+15%</Badge>
              </div>
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="card-feature">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-destructive rounded-full flex items-center justify-center mb-3">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Settings</CardTitle>
              <CardDescription>System configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <Badge variant="outline">All Systems Online</Badge>
              </div>
              <Button className="w-full" variant="outline">
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Order #12345</p>
                    <p className="text-sm text-muted-foreground">customer@example.com • $45.99</p>
                  </div>
                  <Badge variant="secondary">Processing</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Order #12344</p>
                    <p className="text-sm text-muted-foreground">user@example.com • $32.50</p>
                  </div>
                  <Badge>Completed</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Order #12343</p>
                    <p className="text-sm text-muted-foreground">buyer@example.com • $78.25</p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Overview of system health and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Server Status</span>
                  <Badge className="bg-green-500">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Gateway</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Storage</span>
                  <Badge variant="secondary">75% Used</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;