import * as React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutTeam } from '@/components/about/AboutTeam';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
    </div>
  );
}


// [Editable Area] Insert logo upload or code embed here
// [Editable Area] Profile picture upload component can be placed here
// [Editable Area] Embed or upload design graphics here
// [Fix Area] Message status feedback should reflect actual submission result