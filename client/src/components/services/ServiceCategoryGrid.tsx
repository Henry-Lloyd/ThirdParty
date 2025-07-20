import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  GraduationCap, 
  Users, 
  Package, 
  Calendar, 
  ShoppingCart, 
  Truck, 
  Wrench,
  Home,
  Calculator,
  Scale,
  Heart,
  Camera,
  Music,
  Laptop,
  Paintbrush
} from 'lucide-react';

const serviceCategories = [
  {
    icon: Zap,
    title: 'Emergency Services',
    description: 'Urgent household needs - plumbing, electrical, lockouts',
    services: ['Emergency Plumbing', 'Electrical Repairs', 'Locksmith Services', 'HVAC Emergency'],
    availability: '24/7 Available',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600'
  },
  {
    icon: Home,
    title: 'Home Services',
    description: 'Regular maintenance and home improvement',
    services: ['House Cleaning', 'Gardening', 'Painting', 'General Repairs'],
    availability: 'Flexible Scheduling',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    icon: GraduationCap,
    title: 'Professional Services',
    description: 'Expert consultations and professional support',
    services: ['Accounting', 'Legal Advice', 'Business Consulting', 'IT Support'],
    availability: 'By Appointment',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600'
  },
  {
    icon: Users,
    title: 'Skilled Labor',
    description: 'Craftsmen and technical specialists',
    services: ['Carpentry', 'Masonry', 'Welding', 'Construction Work'],
    availability: 'Project-based',
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600'
  },
  {
    icon: Package,
    title: 'Agricultural Supply',
    description: 'Fresh produce directly from local farmers',
    services: ['Vegetables', 'Fruits', 'Grains', 'Dairy Products'],
    availability: 'Seasonal',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600'
  },
  {
    icon: Calendar,
    title: 'Event Services',
    description: 'Complete event planning and execution',
    services: ['Catering', 'Event Planning', 'Photography', 'Entertainment'],
    availability: 'Advance Booking',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600'
  },
  {
    icon: ShoppingCart,
    title: 'Procurement',
    description: 'Business supplies and bulk purchasing',
    services: ['Office Supplies', 'Equipment', 'Raw Materials', 'Inventory'],
    availability: 'Bulk Orders',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600'
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    description: 'Transportation and delivery services',
    services: ['Same-day Delivery', 'Moving Services', 'Cargo Transport', 'Courier'],
    availability: 'On Demand',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600'
  },
  {
    icon: Calculator,
    title: 'Financial Services',
    description: 'Money management and financial planning',
    services: ['Bookkeeping', 'Tax Preparation', 'Financial Planning', 'Auditing'],
    availability: 'Scheduled',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600'
  },
  {
    icon: Heart,
    title: 'Healthcare Support',
    description: 'Health and wellness services',
    services: ['Home Nursing', 'Elderly Care', 'Physical Therapy', 'Health Screening'],
    availability: 'Flexible',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600'
  },
  {
    icon: Laptop,
    title: 'Digital Services',
    description: 'Technology and digital solutions',
    services: ['Web Development', 'Digital Marketing', 'Graphic Design', 'Data Entry'],
    availability: 'Remote/On-site',
    color: 'bg-cyan-50 border-cyan-200',
    iconColor: 'text-cyan-600'
  },
  {
    icon: Music,
    title: 'Creative Services',
    description: 'Arts, entertainment and creative work',
    services: ['Music Lessons', 'Art Classes', 'Writing Services', 'Video Production'],
    availability: 'Flexible',
    color: 'bg-violet-50 border-violet-200',
    iconColor: 'text-violet-600'
  }
];

export function ServiceCategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Service Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of services designed to meet every aspect of your daily needs. 
            Each category features verified, trusted professionals ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className={`hover:shadow-lg transition-all duration-300 ${category.color} border-2`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center ${category.iconColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full">
                      {category.availability}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
                  <CardDescription className="text-gray-700">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>
                        {service}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline">
                    View Providers
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See What You Need?
            </h3>
            <p className="text-gray-600 mb-6">
              Our platform is constantly growing. If you need a service not listed here, 
              let us know and we'll help you find the right provider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/request-service">Request Custom Service</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
