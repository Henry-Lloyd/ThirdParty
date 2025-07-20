import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, CheckCircle, Lock } from 'lucide-react';

const featuredProviders = [
  {
    name: 'John Kumwenda',
    service: 'Emergency Plumbing',
    location: 'Blantyre',
    rating: 4.9,
    reviewCount: 127,
    experience: '8 years',
    availability: 'Available 24/7',
    specialties: ['Emergency Repairs', 'Installation', 'Maintenance'],
    verified: true,
    image: '/api/placeholder/64/64'
  },
  {
    name: 'Grace Mbewe',
    service: 'Professional Cleaning',
    location: 'Lilongwe',
    rating: 4.8,
    reviewCount: 89,
    experience: '5 years',
    availability: 'Mon-Sat 8AM-6PM',
    specialties: ['Deep Cleaning', 'Office Cleaning', 'Post-Construction'],
    verified: true,
    image: '/api/placeholder/64/64'
  },
  {
    name: 'Peter Banda',
    service: 'Electrical Services',
    location: 'Mzuzu',
    rating: 4.9,
    reviewCount: 156,
    experience: '12 years',
    availability: 'Emergency & Scheduled',
    specialties: ['Wiring', 'Solar Installation', 'Repairs'],
    verified: true,
    image: '/api/placeholder/64/64'
  },
  {
    name: 'Mary Phiri',
    service: 'Agricultural Supply',
    location: 'Dedza',
    rating: 4.7,
    reviewCount: 73,
    experience: '10 years',
    availability: 'Seasonal Supply',
    specialties: ['Organic Vegetables', 'Fresh Fruits', 'Grains'],
    verified: true,
    image: '/api/placeholder/64/64'
  },
  {
    name: 'David Mwale',
    service: 'Event Catering',
    location: 'Zomba',
    rating: 4.8,
    reviewCount: 94,
    experience: '7 years',
    availability: 'Book in Advance',
    specialties: ['Wedding Catering', 'Corporate Events', 'Traditional Cuisine'],
    verified: true,
    image: '/api/placeholder/64/64'
  },
  {
    name: 'Sarah Gondwe',
    service: 'Business Consulting',
    location: 'Lilongwe',
    rating: 4.9,
    reviewCount: 112,
    experience: '15 years',
    availability: 'Weekdays 9AM-5PM',
    specialties: ['Strategy', 'Financial Planning', 'Operations'],
    verified: true,
    image: '/api/placeholder/64/64'
  }
];

export function FeaturedProviders() {
  const handleContactProvider = (providerName: string) => {
    // Show an informational message about the middleman approach with specific instructions
    alert(`To contact ${providerName}, please submit a service request through our platform. Make sure you go specific by mentioning ${providerName} as you send your request form. ThirdParty will securely connect you with the provider while protecting both parties' information.`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Service Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet some of our top-rated, verified professionals who consistently deliver 
            exceptional service across various categories.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 text-blue-800">
              <Lock className="h-5 w-5" />
              <p className="text-sm font-medium">
                Protected by ThirdParty: All communications go through our secure platform to protect both clients and providers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-600">
                        {provider.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {provider.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
                    <p className="text-blue-600 font-medium">{provider.service}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-gray-600 text-sm">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600">{provider.experience} experience</div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">{provider.availability}</span>
                  </div>

                  {/* Specialties */}
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Specialties:</div>
                    <div className="flex flex-wrap gap-1">
                      {provider.specialties.map((specialty, specialtyIndex) => (
                        <span 
                          key={specialtyIndex}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button with Lock Icon */}
                  <Button 
                    className="w-full bg-gray-600 hover:bg-gray-700"
                    onClick={() => handleContactProvider(provider.name)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Contact via ThirdParty
                  </Button>
                  
                  {/* Info about secure contact */}
                  <div className="text-xs text-gray-500 text-center">
                    🔒 Secure contact through our platform protects your privacy
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="space-y-4">
            <Button asChild size="lg">
              <Link to="/request-service">Submit a Service Request</Link>
            </Button>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Ready to get started? Submit a service request and we'll connect you with the right provider 
              through our secure platform. No direct contact details are shared until both parties agree.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
