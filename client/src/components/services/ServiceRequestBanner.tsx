import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Shield, Clock } from 'lucide-react';

export function ServiceRequestBanner() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Service Right Now?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't wait - submit your service request and get connected with trusted providers 
            in your area within minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-yellow-400 mb-3" />
              <h3 className="font-semibold mb-2">Verified Providers</h3>
              <p className="text-blue-100 text-sm">All our service providers are vetted and verified</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-yellow-400 mb-3" />
              <h3 className="font-semibold mb-2">Quick Response</h3>
              <p className="text-blue-100 text-sm">Get responses from providers within hours</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-yellow-400 mb-3" />
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-blue-100 text-sm">Your information is safe and secure with us</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
              <Link to="/request-service">
                Submit Service Request
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/register-provider">
                Become a Provider
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
