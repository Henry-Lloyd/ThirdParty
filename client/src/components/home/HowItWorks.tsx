import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, UserCheck, Handshake, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search & Discover',
    description: 'Use our platform to search for the exact service you need. Browse through verified providers in your area.',
    step: '01'
  },
  {
    icon: UserCheck,
    title: 'Choose Your Provider',
    description: 'Review profiles, ratings, and previous work. Select the provider that best matches your requirements.',
    step: '02'
  },
  {
    icon: Handshake,
    title: 'Connect & Agree',
    description: 'Contact your chosen provider directly. Discuss details, agree on pricing, and schedule the service.',
    step: '03'
  },
  {
    icon: Star,
    title: 'Rate & Review',
    description: 'After service completion, rate your experience and leave a review to help the community make informed decisions.',
    step: '04'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting the help you need or finding work opportunities is simple with ThirdParty. 
            Follow these easy steps to connect with trusted service providers or clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="relative mx-auto mb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{step.step}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {/* Connecting Arrow (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose ThirdParty?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">All service providers are verified and vetted for quality and reliability</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">Transparent pricing with no hidden fees or charges</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">24/7 customer support to help you every step of the way</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">Community-driven reviews and ratings for informed decisions</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Join Our Community
                </h4>
                <p className="text-gray-600 mb-4">
                  Whether you need services or want to provide them, ThirdParty is your partner in the daily hustle.
                </p>
                <div className="text-3xl font-bold text-blue-600">1,500+</div>
                <div className="text-sm text-gray-600">Active Community Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
