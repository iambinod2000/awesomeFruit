
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Plus, Star } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'citrus', name: 'Citrus' },
  { id: 'berries', name: 'Berries' },
  { id: 'tropical', name: 'Tropical' },
  { id: 'stone', name: 'Stone Fruits' },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    addItem(product);
  };

  const handleFavoriteToggle = (productId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
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
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Fresh Cut Fruits</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our wide selection of premium quality, freshly cut fruits
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search fruits..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading products...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg">No products found</div>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="card-product group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.category && (
                        <Badge className="bg-success text-white">
                          {product.category}
                        </Badge>
                      )}
                      {product.stock_quantity <= 0 && (
                        <Badge variant="destructive">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  
                   <Button
                     size="icon"
                     variant="ghost"
                     className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                     onClick={() => handleFavoriteToggle(product.id)}
                   >
                     <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                   </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                
                 <p className="text-sm text-muted-foreground">{product.description}</p>
                 
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-1">
                     {renderStars(product.health_rating)}
                     <span className="text-xs text-muted-foreground ml-1">Health Rating</span>
                   </div>
                   <Badge variant="outline">Stock: {product.stock_quantity}</Badge>
                 </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">per unit</div>
                  </div>
                  
                  <Button
                    size="sm"
                    disabled={product.stock_quantity <= 0}
                    className="shrink-0"
                    onClick={() => handleAddToCart(product)}
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

export default Products;
