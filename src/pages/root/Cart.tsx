import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { stripe } from "@/lib/stripe";
import { initiateCheckout } from "@/services/stripeCheckout";
import { userAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { ArrowLeft, CreditCard, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    items: rawItems,
    totalPrice,
    removeFromCart,
    clearCart,
  } = useCartStore();
  const { isAuthenticated, user } = userAuthStore();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const { toast } = useToast();

  const items = rawItems.map((item) => ({
    ...item,
    originalPrice: Math.round(item.price * (1 + (Math.random() * 0.45 + 0.1))),
  }));

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = async (e: any) => {
    e.preventDefault();
    setIsProcessingCheckout(true);
    try {
      const { message, success, sessionId } = await initiateCheckout();
      if (success) {
        const result = await (
          await stripe
        ).redirectToCheckout({
          sessionId,
        });
        if (result.error) {
          toast({
            title: "Checkout failed",
            description: result.error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Checkout successful",
            description: "Redirecting to payment...",
          });
        }
      } else {
        toast({
          title: "Checkout failed",
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const calculateSavings = () => {
    return items.reduce((total, item) => {
      const original = item.originalPrice || item.price;
      return total + (original - item.price);
    }, 0);
  };

  const savings = calculateSavings();

  return (
    <main>
      {items.length === 0 ? (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Shopping Cart
            </h1>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {items.length} Product{items.length !== 1 ? "s" : ""} in Cart
              </h2>

              {items.map((item) => (
                <Card className="border-border bg-card" key={item.productId}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground text-lg leading-tight">
                            {item.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-4"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-foreground">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice &&
                              item.originalPrice > item.price && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                          </div>
                          {/* Optional tag */}
                          <Badge variant="secondary" className="text-xs">
                            Product
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Original Price:
                        </span>
                        <span className="text-foreground">
                          {formatPrice(totalPrice + savings)}
                        </span>
                      </div>

                      {savings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount:</span>
                          <span>-{formatPrice(savings)}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-foreground">Total:</span>
                        <span className="text-foreground">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      {!isAuthenticated ? (
                        <Button asChild className="w-full">
                          <Link to="/auth/signin">Sign In</Link>
                        </Button>
                      ) : (
                        <Button
                          onClick={handleCheckout}
                          className="w-full"
                          size="lg"
                          disabled={isProcessingCheckout}
                        >
                          <CreditCard className="h-5 w-5 mr-2" />
                          {isProcessingCheckout ? "Processing..." : "Checkout"}
                        </Button>
                      )}

                      <Button variant="outline" asChild className="w-full">
                        <Link to="/">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Continue Shopping
                        </Link>
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-foreground mb-2">
                        Order includes:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Warranty available</li>
                        <li>• 7-day replacement policy</li>
                        <li>• Free delivery & tracking</li>
                        <li>• 24/7 customer support</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
