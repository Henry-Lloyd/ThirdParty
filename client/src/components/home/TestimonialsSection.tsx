import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Grace Banda',
    location: 'Blantyre',
    role: 'Homeowner',
    content: 'ThirdParty saved my weekend! When our kitchen sink backed up during a family gathering, I found a reliable plumber through the platform within minutes. Professional service and fair pricing.',
    rating: 5
  },
  {
    name: 'James Phiri',
    location: 'Lilongwe',
    role: 'Farmer',
    content: 'For years I struggled to get fair prices for my vegetables. ThirdParty connected me directly with schools and restaurants. Now I have steady customers and better income for my family.',
    rating: 5
  },
  {
    name: 'Thoko Mwale',
    location: 'Mzuzu',
    role: 'Electrician',
    content: 'As a certified electrician, finding consistent work was challenging. Since joining ThirdParty, I receive regular job requests. The platform has transformed my career and income.',
    rating: 5
  },
  {
    name: 'David Chikwamba',
    location: 'Zomba',
    role: 'Business Owner',
    content: 'Running a catering business requires reliable staff for events. ThirdParty helps me find experienced servers and kitchen help quickly. It\'s made event planning so much easier.',
    rating: 5
  },
  {
    name: 'Memory Kamoto',
    location: 'Dedza',
    role: 'Student Parent',
    content: 'Finding a qualified tutor for my daughter was difficult until I discovered ThirdParty. The platform connected us with an excellent math tutor who has really helped improve her grades.',
    rating: 5
  },
  {
    name: 'Peter Gondwe',
    location: 'Karonga',
    role: 'Shop Owner',
    content: 'ThirdParty helped me find reliable suppliers for my shop. The procurement services saved me time and money. I can focus on serving customers instead of searching for stock.',
    rating: 5
  }
];

export function TestimonialsSection() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people across Malawi who have found success through ThirdParty. 
            These are the connections that make our daily hustle easier and more rewarding.
          </p>
        </div>

        {/* Animated Testimonials Row */}
        <div className="relative mb-12">
          <div className="flex animate-scroll-left space-x-6 w-max">
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card key={index} className="flex-shrink-0 w-80 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-blue-600 opacity-50" />
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Quote */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <Quote className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
          <blockquote className="text-2xl md:text-3xl font-semibold mb-4 italic">
            "ThirdParty isn't just a platform - it's a bridge that connects our communities, 
            empowers our people, and strengthens the fabric of Malawi's economy."
          </blockquote>
          <div className="text-blue-200">
            <div className="font-semibold">The Heart of Our Mission</div>
            <div className="text-sm">Building connections across the Warm Heart of Africa</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
