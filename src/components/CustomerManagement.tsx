import React from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const CustomerManagement = () => {
  const { customers, loading } = useCustomers();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Customers...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>View and manage customer information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.first_name || customer.last_name 
                    ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim()
                    : 'N/A'
                  }
                </TableCell>
                <TableCell>{customer.email || 'N/A'}</TableCell>
                <TableCell>{customer.phone || 'N/A'}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {customer.address || 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {customers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No customers found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerManagement;