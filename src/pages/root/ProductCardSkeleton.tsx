import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-card">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <CardContent className="p-4 space-y-2">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description Skeleton */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        {/* Price Skeleton */}
        <Skeleton className="h-6 w-1/3" />

        {/* Stock Skeleton */}
        <Skeleton className="h-4 w-1/2" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
