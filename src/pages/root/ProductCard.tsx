import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
  };
}

export function ProductCard({ item }: ProductCardProps) {
  const isOutOfStock = item.stock <= 0;
  const cart=useCartStore();

  return (
    <Card className="overflow-hidden border-0 shadow-card hover:shadow-product transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2 text-foreground">
          {item.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="text-lg font-bold text-price">
          ${item.price}
        </div>
        <div className="text-sm text-muted-foreground">
          {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          size="sm"
          disabled={isOutOfStock}
          onClick={() => cart.addToCart(item)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
