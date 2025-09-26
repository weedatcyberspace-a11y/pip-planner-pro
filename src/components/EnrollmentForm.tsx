import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: number;
  title: string;
  price: number;
  currency: string;
}

interface EnrollmentFormProps {
  course: Course;
  onBack: () => void;
}

export const EnrollmentForm = ({ course, onBack }: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    city: '',
    country: '',
    currency: course.currency,
    amount: course.price.toString(),
    description: `Enrollment for ${course.title}`,
    acceptTerms: false
  });

  const countries = [
    'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan',
    'Nigeria', 'Ghana', 'South Africa', 'Egypt', 'Morocco', 'Other'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Basic validation
    if (currentStep === 1) {
      const requiredFields = ['firstName', 'lastName', 'mobile', 'email', 'country'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 2 && !formData.acceptTerms) {
      toast({
        title: "Terms Required", 
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Redirecting to Payment!",
      description: `Redirecting you to complete payment for ${course.title}...`,
    });
    
    // Redirect to Pesapal store
    setTimeout(() => {
      window.open('https://store.pesapal.com/usarichesportal', '_blank');
      onBack();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold">USA RICHES PORTAL</h1>
            <p className="text-sm text-muted-foreground">Course Enrollment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                      </div>
                      <div className="ml-3 text-sm">
                        {step === 1 && 'Enter Details'}
                        {step === 2 && 'Make Payment'}  
                        {step === 3 && 'Confirmation'}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-0.5 ml-4 ${
                          step < currentStep ? 'bg-primary' : 'bg-border'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                <CardTitle>
                  {currentStep === 1 && 'Personal Information'}
                  {currentStep === 2 && 'Payment Details'}
                  {currentStep === 3 && 'Enrollment Complete'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && 'Please provide your details for course enrollment'}
                  {currentStep === 2 && 'Review and confirm your payment information'}
                  {currentStep === 3 && 'Your enrollment has been successfully processed'}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile *</Label>
                        <Input
                          id="mobile"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          placeholder="Enter your mobile number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Enter your city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                          id="amount"
                          value={formData.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Course enrollment description"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I have read & accepted all{' '}
                        <a href="#" className="text-primary hover:underline">
                          terms & conditions
                        </a>
                      </Label>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Enrollment Successful!</h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for enrolling in {course.title}. You will receive payment instructions and course access details via email shortly.
                    </p>
                    <Button onClick={onBack} variant="outline">
                      Return to Courses
                    </Button>
                  </div>
                )}

                {currentStep < 3 && (
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={currentStep === 2 ? handleSubmit : handleNext}
                      disabled={currentStep === 2 && !formData.acceptTerms}
                    >
                      {currentStep === 2 ? (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Make Payment
                        </>
                      ) : (
                        'Next'
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Course Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Professional forex trading course
                  </p>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Course Fee:</span>
                    <span className="font-medium">
                      {course.currency} {course.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee:</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <Badge variant="secondary" className="text-sm">
                      {course.currency} {course.price.toLocaleString()}
                    </Badge>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t">
                  <p className="mb-2">Payment Methods:</p>
                  <ul className="space-y-1">
                    <li>• M-Pesa</li>
                    <li>• Bank Transfer</li>
                    <li>• Card Payment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};