import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Shield, Star, Phone, MessageCircle, Users } from 'lucide-react';

export function ServiceRequestInfo() {
  return (
    <div className="space-y-6">
      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">How It Works</CardTitle>
          <p className="text-gray-600">
            Simple steps to get the help you need from trusted service providers.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Submit Your Request</h3>
              <p className="text-gray-600 text-sm">Fill out the form with your service needs and contact details.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Get Matched</h3>
              <p className="text-gray-600 text-sm">We notify verified providers in your area who match your requirements.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Choose Provider</h3>
              <p className="text-gray-600 text-sm">Review quotes and profiles, then select the best provider for your needs.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Get Service</h3>
              <p className="text-gray-600 text-sm">Coordinate directly with your chosen provider and get the job done.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Times */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Emergency Services</span>
              <span className="font-semibold text-red-600">15-30 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Urgent Requests</span>
              <span className="font-semibold text-orange-600">1-2 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Regular Services</span>
              <span className="font-semibold text-green-600">2-4 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Scheduled Services</span>
              <span className="font-semibold text-blue-600">Next day</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Assurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Quality Assurance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Verified Providers</h4>
                <p className="text-gray-600 text-sm">All providers undergo background checks and credential verification.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Customer Reviews</h4>
                <p className="text-gray-600 text-sm">Read honest reviews from previous customers to make informed decisions.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Satisfaction Guarantee</h4>
                <p className="text-gray-600 text-sm">We're committed to ensuring you're happy with every service.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Need Help? */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 text-sm mb-4">
            Our support team is here to help you through the process.
          </p>
          <div className="space-y-3">
            <a
              href="tel:+265991451188"
              className="flex items-center space-x-3 text-blue-700 hover:text-blue-900 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">+265 991 451 188</span>
            </a>
            <a
              href="https://wa.me/+265991451188"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-blue-700 hover:text-blue-900 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">WhatsApp Support</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
