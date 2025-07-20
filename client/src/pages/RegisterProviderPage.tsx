import * as React from 'react';
import { ProviderRegistrationForm } from '@/components/registration/ProviderRegistrationForm';
import { RegistrationBenefits } from '@/components/registration/RegistrationBenefits';
import { RegistrationProcess } from '@/components/registration/RegistrationProcess';

export function RegisterProviderPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join as a Service Provider</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Connect with thousands of customers across Malawi. Grow your business 
            and build your reputation with ThirdParty's trusted platform.
          </p>
        </div>
      </div>
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProviderRegistrationForm />
            <div className="space-y-12">
              <RegistrationBenefits />
              <RegistrationProcess />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
