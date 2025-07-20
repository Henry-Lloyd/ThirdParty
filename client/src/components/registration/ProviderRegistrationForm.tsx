import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, UserPlus } from 'lucide-react';

const serviceCategories = [
  'Emergency Services',
  'Home Services',
  'Professional Services',
  'Skilled Labor',
  'Agricultural Supply',
  'Event Services',
  'Procurement',
  'Logistics & Delivery',
  'Financial Services',
  'Healthcare Support',
  'Digital Services',
  'Creative Services'
];

const locations = [
  'Blantyre', 'Lilongwe', 'Mzuzu', 'Zomba', 'Dedza', 'Nsanje', 
  'Karonga', 'Chitipa', 'Salima', 'Kasungu', 'Ntchisi', 'Rumphi'
];

export function ProviderRegistrationForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    serviceCategory: '',
    location: '',
    description: '',
    experienceYears: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register-provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceCategory: '',
          location: '',
          description: '',
          experienceYears: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Error registering provider:', error);
      alert(error.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Registration Submitted!</h3>
          <p className="text-green-700 mb-6">
            Thank you for joining ThirdParty! We'll review your application and verify your credentials 
            within 24-48 hours. You'll receive an email confirmation once approved.
          </p>
          <div className="space-y-3 text-sm text-green-700">
            <p><strong>Next Steps:</strong></p>
            <ul className="text-left space-y-1">
              <li>• Check your email for further instructions</li>
              <li>• Prepare any additional documentation if requested</li>
              <li>• Join our WhatsApp group for provider updates</li>
            </ul>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-6 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Register Another Provider
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-gray-900">
          <UserPlus className="h-6 w-6 mr-2 text-blue-600" />
          Service Provider Registration
        </CardTitle>
        <p className="text-gray-600">
          Join our network of trusted service providers and start connecting with customers today.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name / Business Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name or business name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+265 991 451 188"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="experienceYears">Years of Experience</Label>
              <Input
                id="experienceYears"
                name="experienceYears"
                type="number"
                min="0"
                max="50"
                value={formData.experienceYears}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serviceCategory">Service Category *</Label>
              <Select 
                value={formData.serviceCategory} 
                onValueChange={(value) => handleSelectChange('serviceCategory', value)}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your service category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Primary Location *</Label>
              <Select 
                value={formData.location} 
                onValueChange={(value) => handleSelectChange('location', value)}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Service Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your services, specializations, and what makes you unique..."
              className="mt-1 w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Before You Submit:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure all information is accurate and up-to-date</li>
              <li>• Have relevant certificates or credentials ready for verification</li>
              <li>• Review our terms of service and commission structure</li>
              <li>• Prepare to provide references if requested</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Registration...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Submit Registration
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
