import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnrollmentForm } from '@/components/EnrollmentForm';
import { TrendingUp, Users, BarChart, Shield, Star, CheckCircle } from 'lucide-react';

const Index = () => {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'Forex Beginner Course',
      description: 'Master the fundamentals of forex trading with our comprehensive beginner program',
      price: 1999,
      currency: 'KES',
      duration: '4 weeks',
      lessons: 24,
      features: ['Live trading sessions', 'Market analysis', 'Risk management', 'Trading psychology']
    },
    {
      id: 2,
      title: 'Advanced Trading Strategies',
      description: 'Advanced techniques and professional trading strategies for experienced traders',
      price: 2299,
      currency: 'KES', 
      duration: '6 weeks',
      lessons: 36,
      features: ['Advanced chart patterns', 'Algorithmic trading', 'Portfolio management', '1-on-1 mentoring']
    },
    {
      id: 3,
      title: 'Copy Trading Program',
      description: 'Follow professional traders and copy their successful strategies automatically',
      price: 1599,
      currency: 'KES',
      duration: '3 months',
      lessons: 'Unlimited',
      features: ['Top trader signals', 'Automated copying', 'Performance tracking', '24/7 support']
    },
    {
      id: 4,
      title: 'VIP Trading Signals',
      description: 'Premium trading signals with high accuracy from our expert analysts',
      price: 999,
      currency: 'KES',
      duration: '1 month',
      lessons: 'Daily signals',
      features: ['Daily market analysis', 'Entry/exit points', 'Risk levels', 'WhatsApp group']
    }
  ];

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setShowEnrollment(true);
  };

  if (showEnrollment) {
    return <EnrollmentForm course={selectedCourse} onBack={() => setShowEnrollment(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">USA RICHES PORTAL</h1>
                <p className="text-xs text-muted-foreground">Professional Trading Education</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Master Forex Trading
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn from professional traders, get premium signals, and join our copy trading program. 
            All courses under KES 2,500 with proven results.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-5 h-5 text-primary" />
              <span>1000+ Students</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-5 h-5 text-primary" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BarChart className="w-5 h-5 text-primary" />
              <span>85% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Learning Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="relative group hover:shadow-lg transition-all duration-300 border-border/40">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {course.currency} {course.price.toLocaleString()}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lessons:</span>
                    <span className="font-medium">{course.lessons}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features included:</h4>
                    <ul className="space-y-1">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => handleEnroll(course)}
                    className="w-full mt-4"
                    variant="default"
                  >
                    Enroll Now - {course.currency} {course.price.toLocaleString()}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/40 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">USA RICHES PORTAL</h3>
            <p className="text-sm text-muted-foreground">CyberspaceTech - Professional Trading Education</p>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>NAIROBI, Kenya</p>
            <p>TECHcyberspace@gmail.com</p>
            <p>0113000131</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
