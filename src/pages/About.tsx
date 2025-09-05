import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Leaf, Award, Users, Clock, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            About Alluring
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about delivering the freshest, most delicious cut fruits to your table. 
            Our journey began with a simple mission: make premium quality fruits accessible to everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Fresh Beginnings, Lasting Impact
              </h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2020, Alluring started as a small family business with a big dream. 
                We noticed that busy professionals and health-conscious individuals struggled to 
                find fresh, ready-to-eat fruits that matched their lifestyle.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we've grown to serve thousands of customers across the region, but our 
                commitment remains the same: delivering the highest quality cut fruits with 
                exceptional freshness and taste.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="font-medium">Family Owned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-medium">100% Natural</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium">Premium Quality</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-fresh rounded-2xl aspect-square"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To revolutionize how people consume fresh fruits by providing convenient, 
              healthy, and delicious options that fit modern lifestyles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-feature text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We partner with local farmers and use eco-friendly packaging to minimize our environmental impact.
              </p>
            </Card>

            <Card className="card-feature text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Every fruit undergoes rigorous quality checks to ensure you receive only the best products.
              </p>
            </Card>

            <Card className="card-feature text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Care</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We're here to ensure every experience exceeds expectations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Numbers That Matter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">1M+</div>
              <p className="text-muted-foreground">Fruits Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">99%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet The People Behind Alluring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A dedicated team of fruit enthusiasts, nutritionists, and logistics experts 
              working together to bring you the best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO", specialty: "Nutrition Expert" },
              { name: "Mike Chen", role: "Head of Operations", specialty: "Supply Chain" },
              { name: "Emma Wilson", role: "Quality Manager", specialty: "Food Safety" }
            ].map((member) => (
              <Card key={member.name} className="card-feature text-center">
                <div className="w-24 h-24 bg-gradient-fresh rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.specialty}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;