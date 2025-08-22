
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Plus, Star } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Products', color: 'primary' },
  { id: 'citrus', name: 'Citrus', color: 'fruit-orange' },
  { id: 'berries', name: 'Berries', color: 'fruit-berry' },
  { id: 'tropical', name: 'Tropical', color: 'fruit-kiwi' },
  { id: 'stone', name: 'Stone Fruits', color: 'fruit-apple' },
];

const products = [
  {
    id: 1,
    name: 'Mixed Berry Deluxe',
    price: 399,
    originalPrice: 499,
    image: '/placeholder.svg',
    category: 'berries',
    rating: 4.8,
    reviews: 124,
    description: 'Premium mix of strawberries, blueberries, raspberries, and blackberries',
    inStock: true,
    organic: true,
  },
  {
    id: 2,
    name: 'Tropical Paradise Mix',
    price: 349,
    originalPrice: 429,
    image: '/placeholder.svg',
    category: 'tropical',
    rating: 4.9,
    reviews: 89,
    description: 'Fresh mango, pineapple, kiwi, and dragon fruit slices',
    inStock: true,
    organic: false,
  },
  {
    id: 3,
    name: 'Citrus Supreme',
    price: 299,
    originalPrice: 359,
    image: '/placeholder.svg',
    category: 'citrus',
    rating: 4.7,
    reviews: 156,
    description: 'Orange, grapefruit, lime, and lemon segments',
    inStock: true,
    organic: true,
  },
  {
    id: 4,
    name: 'Apple Varieties',
    price: 249,
    originalPrice: 299,
    image: '/placeholder.svg',
    category: 'stone',
    rating: 4.6,
    reviews: 78,
    description: 'Red, green, and yellow apple slices with cinnamon',
    inStock: false,
    organic: false,
  },
  {
    id: 5,
    name: 'Exotic Fruit Bowl',
    price: 549,
    originalPrice: 649,
    image: '/placeholder.svg',
    category: 'tropical',
    rating: 5.0,
    reviews: 45,
    description: 'Rare fruits: passion fruit, lychee, rambutan, and star fruit',
    inStock: true,
    organic: true,
  },
  {
    id: 6,
    name: 'Seasonal Stone Mix',
    price: 329,
    originalPrice: 399,
    image: '/placeholder.svg',
    category: 'stone',
    rating: 4.5,
    reviews: 92,
    description: 'Peach, plum, apricot, and cherry selection',
    inStock: true,
    organic: false,
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-product group cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.organic && (
                      <Badge className="bg-success text-white">
                        Organic
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  
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
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                
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
                  
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
