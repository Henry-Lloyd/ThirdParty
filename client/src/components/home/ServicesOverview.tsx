import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, GraduationCap, Users, Wheat, PartyPopper, ShoppingCart, Truck, Wrench } from 'lucide-react';

const services = [
  {
    icon: AlertTriangle,
    title: 'Emergency Domestic Services',
    description: 'Urgent household needs like plumbing leaks, electrical faults, or lockouts. Get rapid access to help when it\'s most critical.',
    features: ['24/7 Availability', 'Verified Professionals', 'Quick Response'],
    color: 'text-red-600'
  },
  {
    icon: GraduationCap,
    title: 'Professional Services',
    description: 'Connect with qualified professionals such as accountants, lawyers, consultants, and tutors for expert assistance.',
    features: ['Certified Experts', 'Various Specializations', 'Flexible Scheduling'],
    color: 'text-sky-600'
  },
  {
    icon: Users,
    title: 'Skilled Labor Recruitment',
    description: 'Bridge the gap between businesses needing specific skills and the available workforce of artisans and technicians.',
    features: ['Vetted Workers', 'Multiple Skills', 'Project-based or Long-term'],
    color: 'text-green-600'
  },
  {
    icon: Wheat,
    title: 'Agricultural Produce Supply',
    description: 'Direct channel between farmers and consumers, ensuring fresh produce reaches markets efficiently.',
    features: ['Fresh Products', 'Fair Pricing', 'Direct from Farm'],
    color: 'text-yellow-600'
  },
  {
    icon: PartyPopper,
    title: 'Event Support Services',
    description: 'One-stop solution for event needs including catering, setup, staffing, and logistics for your special occasions.',
    features: ['Full Event Planning', 'Professional Staff', 'Custom Packages'],
    color: 'text-purple-600'
  },
  {
    icon: ShoppingCart,
    title: 'Procurement Services',
    description: 'Assist businesses in sourcing and purchasing necessary goods and materials, streamlining operations.',
    features: ['Business Supplies', 'Bulk Orders', 'Competitive Pricing'],
    color: 'text-indigo-600'
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    description: 'Reliable transportation solutions for goods and packages across specified areas in Malawi.',
    features: ['Same-day Delivery', 'Secure Transport', 'Tracking Available'],
    color: 'text-orange-600'
  },
  {
    icon: Wrench,
    title: 'Maintenance Services',
    description: 'Regular maintenance and repair services for homes, offices, and equipment to keep everything running smoothly.',
    features: ['Preventive Maintenance', 'Emergency Repairs', 'Quality Guaranteed'],
    color: 'text-teal-600'
  }
];

export function ServicesOverview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From emergency repairs to professional consultations, from farm-fresh produce to event planning - 
            we connect you with trusted providers across all aspects of daily life in Malawi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 ${service.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-sky-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/services">Explore All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
