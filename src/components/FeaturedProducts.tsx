import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart, Star } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const featuredProducts = products.slice(0, 4);

  const handleFavoriteToggle = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const renderStars = (rating: number | null) => {
    const stars = rating || 3;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= stars
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">Loading products...</div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg">Handpicked fresh fruits for you</p>
          <div className="w-20 h-1 bg-gradient-fresh mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="card-product overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {product.stock_quantity === 0 && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                      Out of Stock
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:scale-110 transition-transform duration-200"
                    onClick={(e) => handleFavoriteToggle(product.id, e)}
                  >
                    <Heart
                      className={`h-4 w-4 transition-all duration-200 ${
                        isFavorite(product.id) ? 'fill-destructive text-destructive scale-110' : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                    {product.name}
                  </CardTitle>
                  {renderStars(product.health_rating)}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{Number(product.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">per kg</div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="shrink-0 hover:scale-105 transition-transform duration-200" 
                    disabled={product.stock_quantity === 0}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-hero" onClick={() => navigate('/products')}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
