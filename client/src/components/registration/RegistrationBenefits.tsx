import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Shield, Star, Clock, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Access to Customers',
    description: 'Connect with thousands of potential customers across all regions of Malawi.',
    color: 'text-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Increase your income and expand your client base through our trusted platform.',
    color: 'text-green-600'
  },
  {
    icon: Shield,
    title: 'Verified Badge',
    description: 'Gain customer trust with our verification system and quality assurance.',
    color: 'text-purple-600'
  },
  {
    icon: Star,
    title: 'Build Reputation',
    description: 'Showcase your skills through customer reviews and ratings system.',
    color: 'text-yellow-600'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Work on your own terms with flexible scheduling and job selection.',
    color: 'text-indigo-600'
  },
  {
    icon: MapPin,
    title: 'Local Network',
    description: 'Connect with other providers in your area and build professional relationships.',
    color: 'text-red-600'
  }
];

export function RegistrationBenefits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">Why Join ThirdParty?</CardTitle>
        <p className="text-gray-600">
          Discover the benefits of being part of Malawi's most trusted service provider network.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 ${benefit.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Success Stories</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>John K.</strong> - "My plumbing business grew 300% in 6 months after joining ThirdParty."
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Grace M.</strong> - "I now have steady cleaning contracts with multiple businesses."
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">
                <strong>Peter B.</strong> - "The platform helped me reach customers I never could before."
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
