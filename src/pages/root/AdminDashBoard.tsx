import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Eye,
  Mail,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/types/orders";
import { formatCurrency, getStatusColor, formatDate } from "@/utils/utils";
import { userAuthStore } from "@/store/auth.store";
import NotFound from "../not-found/NotFound";

export const AdminDashboard = () => {
  const { user, isAuthenticated, isCheckingAuth } = userAuthStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const { data: orders = [], isLoading, error } = useOrders();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const totalOrders = orders.length;

  const totalProducts = orders.reduce((count, order) => {
    return count + order.items.length;
  }, 0);

  const uniqueUsers = new Set(orders.map((order) => order.userId)).size;

  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Order status updated",
      description: `Order #${orderId} has been updated to ${newStatus}.`,
    });
  };

  const handleSendNotification = (order: Order) => {
    toast({
      title: "Email notification sent",
      description: `Payment notification sent to admin for order #${order.orderNumber}.`,
    });
  };

  if (isCheckingAuth) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  if (isAuthenticated && !user?.isAdmin) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="bg-admin-gradient bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all customer orders and business metrics
          </p>
        </div>

        <div className="space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading dashboard data...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-destructive">
                Error loading orders: {error.message}
              </p>
            </div>
          )}

          {/* Dashboard Content */}
          {!isLoading && !error && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(totalRevenue)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Orders
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{uniqueUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>
                    Manage and track all customer orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            #{order.orderNumber}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.userId}</div>
                              <div className="text-sm text-muted-foreground">
                                User ID: {order.userId}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {order.items.length > 0 ? (
                              <div>
                                {order.items.map((item, index) => (
                                  <div key={item.id}>
                                    {item.product.name}
                                    {index < order.items.length - 1 && ", "}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              "No items"
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(order.totalAmount)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSendNotification(order)}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>{" "}
              </Card>
            </>
          )}
        </div>

        {/* Order Detail Section */}
        {selectedOrder && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Order Details #{selectedOrder.orderNumber}
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Orders
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Customer Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>User ID:</strong> {selectedOrder.userId}
                        </p>
                        <p>
                          <strong>Payment Status:</strong>{" "}
                          <Badge
                            variant={
                              selectedOrder.paymentStatus === "COMPLETED"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selectedOrder.paymentStatus}
                          </Badge>
                        </p>
                        <p>
                          <strong>Shipping Address:</strong>
                          <br />
                          {`${selectedOrder.shippingAddress.line1}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} ${selectedOrder.shippingAddress.postal_code}, ${selectedOrder.shippingAddress.country}`}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Order Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Products:</strong>{" "}
                          {selectedOrder.items.length > 0
                            ? selectedOrder.items
                                .map((item) => item.product.name)
                                .join(", ")
                            : "No items"}
                        </p>
                        <p>
                          <strong>Total Items:</strong>{" "}
                          {selectedOrder.items.length}
                        </p>
                        <p>
                          <strong>Total:</strong>{" "}
                          {formatCurrency(selectedOrder.totalAmount)}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {formatDate(selectedOrder.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  {selectedOrder.items.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 border rounded-lg"
                          >
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-lg">
                                {item.product.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.product.description}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Quantity: {item.quantity} ×{" "}
                                {formatCurrency(item.price)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-lg">
                                {formatCurrency(item.quantity * item.price)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Unit Price: {formatCurrency(item.price)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">Update Status</h4>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(value) =>
                          handleOrderStatusChange(selectedOrder.id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 md:items-end">
                      <Button
                        variant="default"
                        onClick={() => handleSendNotification(selectedOrder)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email Notification
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
