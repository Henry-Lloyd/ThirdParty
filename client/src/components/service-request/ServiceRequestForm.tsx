import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Send, AlertTriangle, Loader2 } from 'lucide-react';

const serviceTypes = [
  'Emergency Plumbing',
  'Electrical Repair',
  'House Cleaning',
  'Gardening',
  'Painting',
  'Carpentry',
  'Masonry',
  'Tutoring',
  'Accounting',
  'Legal Consultation',
  'Event Catering',
  'Agricultural Supply',
  'Transportation',
  'Other (Specify in description)'
];

const locations = [
  'Blantyre', 'Lilongwe', 'Mzuzu', 'Zomba', 'Dedza', 'Nsanje', 
  'Karonga', 'Chitipa', 'Salima', 'Kasungu', 'Ntchisi', 'Rumphi'
];

export function ServiceRequestForm() {
  const [formData, setFormData] = React.useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceType: '',
    location: '',
    description: '',
    urgent: false
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');
  const [debugInfo, setDebugInfo] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
      setDebugInfo('');
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user makes selection
    if (error) {
      setError('');
      setDebugInfo('');
    }
  };

  const handleUrgentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      urgent: checked
    }));
  };

  const validateForm = () => {
    const { clientName, clientEmail, clientPhone, serviceType, location, description } = formData;
    
    if (!clientName.trim()) {
      setError('Please enter your name');
      return false;
    }
    
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!clientPhone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    
    if (!serviceType) {
      setError('Please select a service type');
      return false;
    }
    
    if (!location) {
      setError('Please select your location');
      return false;
    }
    
    if (!description.trim()) {
      setError('Please provide a description of your service need');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDebugInfo('');
    
    console.log('=== SERVICE REQUEST FORM SUBMISSION START ===');
    console.log('Form data before validation:', formData);
    
    // Validate form before submission
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the request data with exact field names expected by the API
      const requestData = {
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim().toLowerCase(),
        clientPhone: formData.clientPhone.trim(),
        serviceType: formData.serviceType,
        location: formData.location,
        description: formData.description.trim(),
        urgent: Boolean(formData.urgent)
      };

      console.log('Submitting service request with data:', requestData);
      setDebugInfo(`Submitting request for ${requestData.clientName}...`);
      
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 200)}`);
      }

      console.log('Parsed response data:', responseData);
      
      // Check for successful response based on status code AND response data
      if (response.ok && (responseData.success === true || responseData.id)) {
        console.log('Service request submitted successfully:', responseData);
        setIsSubmitted(true);
        setDebugInfo(`Success! Request ID: ${responseData.id || 'N/A'}`);
        
        // Reset form
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          serviceType: '',
          location: '',
          description: '',
          urgent: false
        });
      } else {
        console.error('Server error response:', responseData);
        
        let errorMessage = 'Failed to submit service request. Please try again.';
        
        // Check various possible error message fields
        if (responseData.error) {
          errorMessage = responseData.error;
        } else if (responseData.details) {
          errorMessage = responseData.details;
        } else if (responseData.message && !responseData.success) {
          errorMessage = responseData.message;
        } else if (!response.ok) {
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        
        setError(errorMessage);
        setDebugInfo(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('=== SERVICE REQUEST SUBMISSION ERROR ===');
      console.error('Network/Request error:', error);
      
      setError('Network error. Please check your connection and try again.');
      setDebugInfo(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      console.log('=== SERVICE REQUEST FORM SUBMISSION END ===');
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError('');
    setDebugInfo('');
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceType: '',
      location: '',
      description: '',
      urgent: false
    });
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Request Submitted Successfully!</h3>
          <p className="text-green-700 mb-6">
            Your service request has been successfully submitted and is now visible in our admin dashboard. 
            We're connecting you with verified providers in your area.
          </p>
          {debugInfo && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
              <p className="text-green-800 text-sm font-mono">{debugInfo}</p>
            </div>
          )}
          <div className="space-y-3 text-sm text-green-700 mb-6">
            <p><strong>What happens next:</strong></p>
            <ul className="text-left space-y-1">
              <li>• Your request is now in our system and visible to administrators</li>
              <li>• ThirdParty will review and match you with suitable providers</li>
              <li>• Providers in your area will be notified within 15 minutes</li>
              <li>• You'll receive quotes and responses within 2-4 hours</li>
              <li>• For urgent requests, expect calls within 30 minutes</li>
              <li>• We'll send updates via SMS and email</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={resetForm}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Submit Another Request
            </Button>
            <Button 
              asChild
              className="bg-green-600 hover:bg-green-700"
            >
              <a href="/admin/login" target="_blank">
                View Admin Dashboard
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-gray-900">
          <Send className="h-6 w-6 mr-2 text-blue-600" />
          Service Request Form
        </CardTitle>
        <p className="text-gray-600">
          Tell us what you need and we'll connect you with the right service provider.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Your Name *</Label>
              <Input
                id="clientName"
                name="clientName"
                type="text"
                value={formData.clientName}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
                className="mt-1"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email Address *</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className="mt-1"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientPhone">Phone Number *</Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={handleInputChange}
                required
                placeholder="+265 991 451 188"
                className="mt-1"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Select 
                value={formData.location} 
                onValueChange={(value) => handleSelectChange('location', value)}
                required
                disabled={isSubmitting}
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
            <Label htmlFor="serviceType">Service Type *</Label>
            <Select 
              value={formData.serviceType} 
              onValueChange={(value) => handleSelectChange('serviceType', value)}
              required
              disabled={isSubmitting}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="What service do you need?" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Please describe your need in detail. Include any specific requirements, preferred timing, budget range, etc."
              className="mt-1 w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={formData.urgent}
              onCheckedChange={handleUrgentChange}
              disabled={isSubmitting}
            />
            <Label htmlFor="urgent" className="flex items-center text-sm">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
              This is an urgent request (requires immediate attention)
            </Label>
          </div>

          {formData.urgent && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Urgent Request Notice</h4>
                  <p className="text-red-700 text-sm">
                    For truly urgent situations (emergencies, urgent repairs), we'll prioritize your request 
                    and notify providers immediately. Additional charges may apply for emergency services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                  {debugInfo && (
                    <p className="text-red-700 text-xs font-mono mt-1">{debugInfo}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {debugInfo && !error && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm font-mono">{debugInfo}</p>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about your requirements for better matching</li>
              <li>• Include your preferred timeline and budget range</li>
              <li>• Mention any special materials or equipment needed</li>
              <li>• Add photos if helpful (you can send them via WhatsApp later)</li>
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Service Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
