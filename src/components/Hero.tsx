
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <span className="text-muted-foreground">Trusted by 10,000+ customers</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Fresh Cut
                <span className="block text-gradient">Fruits Daily</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Premium quality, freshly cut fruits delivered to your doorstep. 
                Experience the pure taste of nature with our handpicked selection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button className="btn-hero group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button className="btn-ghost-hero">
                View Menu
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Fresh Daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">30min</div>
                <div className="text-sm text-muted-foreground">Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-muted-foreground">Varieties</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/home-image.webp"
                alt="Fresh cut fruits"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl animate-float"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-fresh text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">₹29</div>
                <div className="text-sm opacity-90">Per kg</div>
              </div>
            </div>
            
            <div className="absolute top-8 -left-8 w-32 h-32 bg-fruit-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-fruit-grape/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-4 w-24 h-24 bg-fruit-kiwi/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
