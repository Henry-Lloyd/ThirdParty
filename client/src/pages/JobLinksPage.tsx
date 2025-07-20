import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, DollarSign, Share, Phone, AlertCircle, Briefcase, TrendingUp } from 'lucide-react';

interface JobPosting {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  positions_available: number;
  deadline?: string;
  requirements?: string;
  payment_type: string;
  upfront_fee?: number;
  share_percentage?: number;
  contact_info?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function JobLinksPage() {
  const [jobs, setJobs] = React.useState<JobPosting[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      console.log('Fetching available jobs...');
      setLoading(true);
      setError(null);

      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        console.log('Jobs data received:', data);
        setJobs(data);
      } else {
        throw new Error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const handleContactForJob = (jobId: number, contactInfo: string) => {
    // For now, we'll use WhatsApp contact
    const message = encodeURIComponent(`Ndikufuna job imeneyi (Job ID: ${jobId}). Mungandiwuze zambiri?`);
    window.open(`https://wa.me/+265991451188?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading available jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Job Links - Mipata ya Ntchito
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Ntchito zomwe zili zopatsa ndalama mwachangu. Tigwirane ntchito, tidzagawana.
            </p>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-2">Momwe zimayendera:</h3>
              <ul className="text-left text-blue-100 space-y-2">
                <li>• Ona ntchito yomwe ikukukomera</li>
                <li>• Lembetsa kufuna job yomweyo</li>
                <li>• Tidzakupatsa ma details onse</li>
                <li>• Ukagwira ntchito, tidzagawana ndalama</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Listing */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-800">Error loading jobs: {error}</p>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Available Jobs ({jobs.length})
            </h2>
            <p className="text-gray-600">
              Ntchito zomwe zili zopatsa ndalama. Sankhani yomwe mukudziwa.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Palibe ntchito pano
              </h3>
              <p className="text-gray-600 mb-6">
                Tikuyang'aniranso ma opportunities athu. Bwerani kamsogolo.
              </p>
              <Button onClick={fetchJobs} variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Check Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900 mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.positions_available} positions
                          </div>
                        </div>
                        <Badge 
                          variant={job.status === 'active' ? 'default' : 'secondary'}
                          className="mb-3"
                        >
                          {job.status === 'active' ? 'Available' : 'Filled'}
                        </Badge>
                      </div>
                      {job.deadline && (
                        <div className="text-right">
                          <div className="flex items-center text-sm text-orange-600">
                            <Clock className="h-4 w-4 mr-1" />
                            Deadline
                          </div>
                          <p className="text-sm text-gray-600">{job.deadline}</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Job Type:</h4>
                        <p className="text-blue-600 font-medium">{job.job_type}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description:</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
                      </div>

                      {job.requirements && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                          <p className="text-gray-600 text-sm">{job.requirements}</p>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Payment Structure:
                        </h4>
                        {job.payment_type === 'upfront' ? (
                          <div className="text-sm">
                            <p className="text-gray-700">
                              <strong>Upfront Fee:</strong> MWK {job.upfront_fee?.toLocaleString() || '0'}
                            </p>
                            <p className="text-blue-600 mt-1">
                              Udzalipira koyambapo kuti tidzipatse job details.
                            </p>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <p className="text-gray-700 flex items-center">
                              <Share className="h-4 w-4 mr-1" />
                              <strong>Profit Sharing:</strong> {job.share_percentage || 0}% to ThirdParty
                            </p>
                            <p className="text-green-600 mt-1">
                              Tidzagawana ndalama ukagwira ntchito. Palibe cholipira poyamba.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-gray-500">
                          Posted: {new Date(job.created_at).toLocaleDateString()}
                        </div>
                        <Button 
                          onClick={() => handleContactForJob(job.id, job.contact_info || '')}
                          disabled={job.status !== 'active'}
                          className="flex items-center"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {job.status === 'active' ? 'Funsani Job Iyi' : 'Job Filled'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Mukufuna thandizo kapena muli ndi mafunso?
            </h3>
            <p className="text-gray-600 mb-4">
              Tiyankhaneni pa WhatsApp kapena kutumizani message.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <a href="https://wa.me/+265991451188" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp: +265 991 451 188
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:info@thirdparty.mw">
                  Email: info@thirdparty.mw
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
