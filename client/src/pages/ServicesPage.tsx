import * as React from 'react';
import { ServiceCategoryGrid } from '@/components/services/ServiceCategoryGrid';
import { FeaturedProviders } from '@/components/services/FeaturedProviders';
import { ServiceRequestBanner } from '@/components/services/ServiceRequestBanner';

export function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive solutions for all your daily needs across Malawi. 
            From emergency services to professional consultations, we've got you covered.
          </p>
        </div>
      </div>
      
      <ServiceCategoryGrid />
      <FeaturedProviders />
      <ServiceRequestBanner />
    </div>
  );
}
