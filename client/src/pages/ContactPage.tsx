import * as React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { LocationMap } from '@/components/contact/LocationMap';
import { FAQSection } from '@/components/contact/FAQSection';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to help! Get in touch with our team for support, partnerships, 
            or any questions about ThirdParty services.
          </p>
        </div>
      </div>
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      
      <LocationMap />
      <FAQSection />
    </div>
  );
}


// [Editable Area] Insert logo upload or code embed here
// [Editable Area] Profile picture upload component can be placed here
// [Editable Area] Embed or upload design graphics here
// [Fix Area] Message status feedback should reflect actual submission result