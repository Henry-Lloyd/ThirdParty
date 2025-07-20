import * as React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { HowItWorks } from '@/components/home/HowItWorks';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CallToAction } from '@/components/home/CallToAction';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesOverview />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
}


// [Editable Area] Insert logo upload or code embed here
// [Editable Area] Profile picture upload component can be placed here
// [Editable Area] Embed or upload design graphics here
// [Fix Area] Message status feedback should reflect actual submission result

// ThirdParty custom logo and profile section
import ImageUploader from '@/components/ui/ImageUploader';
import SuccessAlert from '@/components/ui/SuccessAlert';

function HomePage() {
  const handleUpload = (file: File) => {
    console.log("Uploaded:", file.name);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Logo Preview */}
      <div className="flex justify-center">
        <img src="/images/thirdparty-logo.png" alt="ThirdParty Logo" className="h-16" />
      </div>

      {/* Promo Graphic */}
      <div className="flex justify-center">
        <img src="/images/profile-placeholder.jpg" alt="ThirdParty Promo" className="rounded shadow-md w-full max-w-md" />
      </div>

      {/* Uploaders for Admin/Profile edits */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ImageUploader label="Change Logo" onUpload={handleUpload} />
        <ImageUploader label="Upload Profile Picture" onUpload={handleUpload} />
      </div>

      {/* Submission Alert Example */}
      <SuccessAlert message="Your request has been submitted!" visible={true} />
    </div>
  );
}

export default HomePage;
