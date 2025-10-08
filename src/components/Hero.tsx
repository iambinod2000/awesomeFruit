
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
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
              <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Fresh Daily</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors duration-300">
                <div className="text-3xl font-bold text-secondary">30min</div>
                <div className="text-sm text-muted-foreground">Delivery</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors duration-300">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-muted-foreground">Varieties</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="relative group">
                <img
                  src="/placeholder.svg"
                  alt="Fresh cut fruits"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl animate-float group-hover:shadow-3xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-fresh text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold">₹299</div>
                <div className="text-sm opacity-90">Per kg</div>
              </div>
            </div>
            
            <div className="absolute top-8 -left-8 w-32 h-32 bg-fruit-orange/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-fruit-grape/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-4 w-24 h-24 bg-fruit-kiwi/20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
