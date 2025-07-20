import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, Users, ArrowRight, Building2 } from 'lucide-react';

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_range?: string;
  application_deadline?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function CareersPage() {
  const [careers, setCareers] = React.useState<Career[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/careers');
        if (response.ok) {
          const data = await response.json();
          setCareers(data);
        } else {
          throw new Error('Failed to fetch careers');
        }
      } catch (error) {
        console.error('Error fetching careers:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const formatEmploymentType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading career opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading careers: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Be part of building Malawi's premier platform for connecting services and opportunities. 
                Help us empower local entrepreneurs and service providers across the country.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{careers.length}</div>
                  <div className="text-gray-600">Open Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Remote Friendly</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className="text-2xl font-bold mb-2">Career Opportunities</h3>
                  <p className="text-blue-100">Join Our Growing Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building something meaningful - a platform that creates opportunities and connects communities across Malawi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Impact-Driven</h3>
                <p className="text-gray-600">
                  Your work directly impacts thousands of people across Malawi, creating opportunities and solving real problems.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Collaborative Team</h3>
                <p className="text-gray-600">
                  Work with a passionate team that values innovation, creativity, and diverse perspectives.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <ArrowRight className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
                <p className="text-gray-600">
                  Grow your skills and career with mentorship, training, and opportunities to take on new challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Find your next opportunity and help shape the future of services in Malawi
            </p>
          </div>

          {careers.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Open Positions</h3>
              <p className="text-gray-600 mb-6">
                We don't have any open positions at the moment, but we're always looking for talented individuals. 
                Check back soon or reach out to us directly.
              </p>
              <Button onClick={() => window.location.href = '/contact'}>
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {careers.map((career) => (
                <Card key={career.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl text-blue-600 mb-2">
                          {career.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            {career.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {career.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatEmploymentType(career.employment_type)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                        <Badge variant="secondary">{career.department}</Badge>
                        <Badge variant="outline">{formatEmploymentType(career.employment_type)}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-700">{career.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                        <p className="text-gray-700">{career.responsibilities}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <p className="text-gray-700">{career.requirements}</p>
                      </div>
                      
                      {career.salary_range && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Salary Range</h4>
                          <p className="text-gray-700">{career.salary_range}</p>
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
                        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                          {career.application_deadline && (
                            <span>
                              Application Deadline: {formatDate(career.application_deadline)}
                            </span>
                          )}
                        </div>
                        
                        <Button onClick={() => window.location.href = '/contact'}>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in building Malawi's premier platform for connecting services and creating opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900"
            >
              Get in Touch
            </Button>
            <Button 
              onClick={() => window.location.href = '/about'}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
