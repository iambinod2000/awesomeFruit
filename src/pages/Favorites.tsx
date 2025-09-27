import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, Star } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const Favorites = () => {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (product: any) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    addItem(product);
  };

  const renderStars = (rating: number | null) => {
    const stars = [];
    const actualRating = rating || 3;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= actualRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">My Favorites</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your favorite fresh fruits collection
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading favorites...</div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg">No favorites yet</div>
            <p className="text-muted-foreground">Start adding products to your favorites!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="card-product group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={favorite.product?.image_url || '/placeholder.svg'}
                      alt={favorite.product?.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      onClick={() => removeFromFavorites(favorite.product_id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 space-y-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {favorite.product?.name}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-1">
                    {renderStars(favorite.product?.health_rating)}
                    <span className="text-xs text-muted-foreground ml-1">Health Rating</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">${favorite.product?.price?.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">per unit</div>
                    </div>
                    
                    <Button
                      size="sm"
                      className="shrink-0"
                      onClick={() => handleAddToCart(favorite.product)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;