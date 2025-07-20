import * as React from 'react';
import { ServiceRequestForm } from '@/components/service-request/ServiceRequestForm';
import { ServiceRequestInfo } from '@/components/service-request/ServiceRequestInfo';
import { EmergencyServices } from '@/components/service-request/EmergencyServices';

export function RequestServicePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Service</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Need help with something? Submit your service request and get connected 
            with trusted providers in your area within minutes.
          </p>
        </div>
      </div>
      
      <EmergencyServices />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ServiceRequestForm />
            <ServiceRequestInfo />
          </div>
        </div>
      </div>
    </div>
  );
}


// [Editable Area] Insert logo upload or code embed here
// [Editable Area] Profile picture upload component can be placed here
// [Editable Area] Embed or upload design graphics here
// [Fix Area] Message status feedback should reflect actual submission result