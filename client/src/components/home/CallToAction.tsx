import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Briefcase, Phone, MessageCircle, Mail, Heart } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="mb-16">
            <Heart className="h-16 w-16 mx-auto mb-6 text-red-400" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-xl md:text-2xl text-sky-100 mb-8">
              Be part of Malawi's trusted service community. Whether you need help or want to help others, 
              your journey starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 text-lg px-8 py-4"
              >
                <Link to="/request-service">
                  Get Help Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-sky-600 text-lg px-8 py-4"
              >
                <Link to="/register-provider">
                  Start Earning
                </Link>
              </Button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Wrench className="h-12 w-12 mx-auto mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3">Need a Service?</h3>
              <p className="text-sky-100 mb-4">
                From emergency repairs to professional consultations, find trusted providers in your area.
              </p>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600">
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3">Want to Provide Services?</h3>
              <p className="text-sky-100 mb-4">
                Join our network of verified providers and connect with customers who need your skills.
              </p>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600">
                <Link to="/register-provider">Join Our Network</Link>
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-white bg-opacity-10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Questions? We're Here to Help!</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-sky-200" />
                <span className="text-sky-200">Call us:</span>
                <a href="tel:+265991451188" className="font-semibold hover:text-yellow-400 transition-colors">
                  +265 991 451 188
                </a>
              </div>
              <div className="hidden sm:block text-sky-300">•</div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-sky-200" />
                <span className="text-sky-200">WhatsApp:</span>
                <a 
                  href="https://wa.me/+265991451188" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-yellow-400 transition-colors"
                >
                  Chat with us
                </a>
              </div>
              <div className="hidden sm:block text-sky-300">•</div>
              <Button asChild variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-sky-600">
                <Link to="/contact">
                  <Mail className="h-4 w-4 mr-1" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
