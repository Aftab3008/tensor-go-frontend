import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cart.store";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

const Home = () => {
  const cartItems = useCartStore((state) => state.items);

  const {
    data: currentProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  return (
    <main>
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Premium Shopping Experience
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing products with unbeatable prices
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <span className="border border-green-500  text-sm font-medium px-3 py-1 rounded-full text-muted-foreground">
                6 Products
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="border border-green-500  text-sm font-medium px-3 py-1 rounded-full text-muted-foreground">
                5 in Stock
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="border border-green-500  text-sm font-medium px-3 py-1 rounded-full text-muted-foreground">
                Free Shipping
              </span>
            </div>
          </div>
        </div>
      </section>
      {cartItems.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Featured Products ({cartItems?.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartItems.map((item) => (
                <ProductCard
                  key={item.productId}
                  item={{
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    stock: 10,
                    description: "Recently added to your cart",
                    imageUrl: item.imageUrl,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Available Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              // Show loading skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : productsError ? (
              // Show error message
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  Failed to load products. Please try again later.
                </p>
              </div>
            ) : !currentProducts || currentProducts.length === 0 ? (
              // Show no products message
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No products available.</p>
              </div>
            ) : (
              // Show actual products
              currentProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
