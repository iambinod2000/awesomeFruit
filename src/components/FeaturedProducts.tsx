
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: 'Mixed Berry Bowl',
    price: 399,
    originalPrice: 499,
    image: '/placeholder.svg',
    category: 'berries',
    badge: 'Popular',
    description: 'Fresh strawberries, blueberries, and raspberries',
  },
  {
    id: 2,
    name: 'Tropical Paradise',
    price: 349,
    originalPrice: 429,
    image: '/placeholder.svg',
    category: 'tropical',
    badge: 'New',
    description: 'Mango, pineapple, and kiwi slices',
  },
  {
    id: 3,
    name: 'Citrus Burst',
    price: 299,
    originalPrice: 359,
    image: '/placeholder.svg',
    category: 'citrus',
    badge: 'Sale',
    description: 'Orange, grapefruit, and lime segments',
  },
  {
    id: 4,
    name: 'Apple Crunch',
    price: 249,
    originalPrice: 299,
    image: '/placeholder.svg',
    category: 'stone',
    badge: '',
    description: 'Fresh apple slices with honey dip',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked fresh fruits, cut and packed with love for your daily nutrition needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="card-product group cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                
                <p className="text-sm text-muted-foreground">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">per kg</div>
                  </div>
                  
                  <Button size="sm" className="shrink-0">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-hero">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
