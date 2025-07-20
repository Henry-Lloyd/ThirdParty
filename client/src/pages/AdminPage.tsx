import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, Users, MessageSquare, Mail, Phone, MapPin, LogOut, Shield, AlertCircle, RefreshCw, Briefcase, Plus, Edit, Trash2, DollarSign, Share } from 'lucide-react';

interface ServiceProvider {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_category: string;
  location: string;
  description?: string;
  experience_years?: number;
  verified: boolean;
  created_at: string;
}

interface ServiceRequest {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_type: string;
  location: string;
  description: string;
  urgent: boolean;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

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

export function AdminPage() {
  const [providers, setProviders] = React.useState<ServiceProvider[]>([]);
  const [requests, setRequests] = React.useState<ServiceRequest[]>([]);
  const [messages, setMessages] = React.useState<ContactMessage[]>([]);
  const [jobs, setJobs] = React.useState<JobPosting[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [showJobForm, setShowJobForm] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState<JobPosting | null>(null);
  const navigate = useNavigate();

  // Job form state
  const [jobForm, setJobForm] = React.useState({
    title: '',
    description: '',
    location: '',
    jobType: '',
    positionsAvailable: 1,
    deadline: '',
    requirements: '',
    paymentType: 'share',
    upfrontFee: 0,
    sharePercentage: 20,
    contactInfo: ''
  });

  // Check authentication on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.log('No admin token found, redirecting to login');
      navigate('/admin/login');
      return;
    }
    console.log('Admin token found, setting authenticated');
    setIsAuthenticated(true);
  }, [navigate]);

  const fetchData = async () => {
    try {
      console.log('=== ADMIN DASHBOARD FETCHING DATA ===');
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      console.log('Fetching providers...');
      const providersRes = await fetch('/api/admin/providers', { headers });
      if (!providersRes.ok) {
        if (providersRes.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`Failed to fetch providers: ${providersRes.status}`);
      }
      const providersData = await providersRes.json();
      console.log('Providers data received:', providersData.length, 'providers');
      setProviders(providersData);

      console.log('Fetching service requests...');
      const requestsRes = await fetch('/api/admin/requests', { headers });
      if (!requestsRes.ok) {
        if (requestsRes.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`Failed to fetch requests: ${requestsRes.status}`);
      }
      const requestsData = await requestsRes.json();
      console.log('Requests data received:', requestsData.length, 'requests');
      setRequests(requestsData);

      console.log('Fetching contact messages...');
      const messagesRes = await fetch('/api/admin/messages', { headers });
      if (!messagesRes.ok) {
        if (messagesRes.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`Failed to fetch messages: ${messagesRes.status}`);
      }
      const messagesData = await messagesRes.json();
      console.log('Messages data received:', messagesData.length, 'messages');
      setMessages(messagesData);

      console.log('Fetching job postings...');
      const jobsRes = await fetch('/api/admin/jobs', { headers });
      if (!jobsRes.ok) {
        if (jobsRes.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`Failed to fetch jobs: ${jobsRes.status}`);
      }
      const jobsData = await jobsRes.json();
      console.log('Jobs data received:', jobsData.length, 'jobs');
      setJobs(jobsData);

      console.log('=== ADMIN DASHBOARD DATA FETCH COMPLETE ===');
    } catch (error) {
      console.error('=== ADMIN DASHBOARD FETCH ERROR ===');
      console.error('Error fetching admin data:', error);
      setError(error.message);
      
      if (error.message === 'Unauthorized') {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleJobFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (editingJob) {
        // Update existing job
        const response = await fetch(`/api/admin/jobs/${editingJob.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(jobForm)
        });

        if (response.ok) {
          console.log('Job updated successfully');
        } else {
          throw new Error('Failed to update job');
        }
      } else {
        // Create new job
        const response = await fetch('/api/admin/jobs', {
          method: 'POST',
          headers,
          body: JSON.stringify(jobForm)
        });

        if (response.ok) {
          console.log('Job created successfully');
        } else {
          throw new Error('Failed to create job');
        }
      }

      // Reset form and refresh data
      setJobForm({
        title: '',
        description: '',
        location: '',
        jobType: '',
        positionsAvailable: 1,
        deadline: '',
        requirements: '',
        paymentType: 'share',
        upfrontFee: 0,
        sharePercentage: 20,
        contactInfo: ''
      });
      setShowJobForm(false);
      setEditingJob(null);
      fetchData();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    }
  };

  const handleEditJob = (job: JobPosting) => {
    setJobForm({
      title: job.title,
      description: job.description,
      location: job.location,
      jobType: job.job_type,
      positionsAvailable: job.positions_available,
      deadline: job.deadline || '',
      requirements: job.requirements || '',
      paymentType: job.payment_type,
      upfrontFee: job.upfront_fee || 0,
      sharePercentage: job.share_percentage || 20,
      contactInfo: job.contact_info || ''
    });
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Job deleted successfully');
        fetchData();
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Shield className="h-8 w-8 mr-3 text-blue-600" />
              ThirdParty Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage providers, requests, messages, and job postings</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} variant="outline" className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {[
              { id: 'overview', label: 'Overview', icon: Shield },
              { id: 'providers', label: 'Providers', icon: Users },
              { id: 'requests', label: 'Requests', icon: Clock },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'jobs', label: 'Job Postings', icon: Briefcase }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Providers</p>
                    <p className="text-2xl font-bold text-gray-900">{providers.length}</p>
                    <p className="text-xs text-gray-500">
                      {providers.filter(p => p.verified).length} verified
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Service Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                    <p className="text-xs text-gray-500">
                      {requests.filter(r => r.urgent).length} urgent
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                    <p className="text-xs text-gray-500">
                      {messages.filter(m => new Date(m.created_at) > new Date(Date.now() - 24*60*60*1000)).length} today
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Briefcase className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Job Postings</p>
                    <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                    <p className="text-xs text-gray-500">
                      {jobs.filter(j => j.status === 'active').length} active
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Job Postings Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Job Postings Management ({jobs.length})</h2>
              <Button 
                onClick={() => setShowJobForm(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </div>

            {/* Job Form */}
            {showJobForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJobFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          id="jobTitle"
                          value={jobForm.title}
                          onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobLocation">Location *</Label>
                        <Input
                          id="jobLocation"
                          value={jobForm.location}
                          onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="jobDescription">Description *</Label>
                      <textarea
                        id="jobDescription"
                        value={jobForm.description}
                        onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                        className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="jobType">Job Type *</Label>
                        <Select
                          value={jobForm.jobType}
                          onValueChange={(value) => setJobForm({...jobForm, jobType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="temporary">Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="positions">Positions Available</Label>
                        <Input
                          id="positions"
                          type="number"
                          min="1"
                          value={jobForm.positionsAvailable}
                          onChange={(e) => setJobForm({...jobForm, positionsAvailable: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={jobForm.deadline}
                          onChange={(e) => setJobForm({...jobForm, deadline: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirements">Requirements</Label>
                      <textarea
                        id="requirements"
                        value={jobForm.requirements}
                        onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                        className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="List job requirements..."
                      />
                    </div>

                    <div>
                      <Label>Payment Type *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="paymentUpfront"
                            name="paymentType"
                            value="upfront"
                            checked={jobForm.paymentType === 'upfront'}
                            onChange={(e) => setJobForm({...jobForm, paymentType: e.target.value})}
                          />
                          <Label htmlFor="paymentUpfront">Upfront Payment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="paymentShare"
                            name="paymentType"
                            value="share"
                            checked={jobForm.paymentType === 'share'}
                            onChange={(e) => setJobForm({...jobForm, paymentType: e.target.value})}
                          />
                          <Label htmlFor="paymentShare">Revenue Share</Label>
                        </div>
                      </div>
                    </div>

                    {jobForm.paymentType === 'upfront' && (
                      <div>
                        <Label htmlFor="upfrontFee">Upfront Fee (MWK)</Label>
                        <Input
                          id="upfrontFee"
                          type="number"
                          min="0"
                          value={jobForm.upfrontFee}
                          onChange={(e) => setJobForm({...jobForm, upfrontFee: parseFloat(e.target.value)})}
                        />
                      </div>
                    )}

                    {jobForm.paymentType === 'share' && (
                      <div>
                        <Label htmlFor="sharePercentage">Revenue Share Percentage (%)</Label>
                        <Input
                          id="sharePercentage"
                          type="number"
                          min="0"
                          max="100"
                          value={jobForm.sharePercentage}
                          onChange={(e) => setJobForm({...jobForm, sharePercentage: parseFloat(e.target.value)})}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Input
                        id="contactInfo"
                        value={jobForm.contactInfo}
                        onChange={(e) => setJobForm({...jobForm, contactInfo: e.target.value})}
                        placeholder="Email or phone for applications"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        {editingJob ? 'Update Job' : 'Create Job'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setShowJobForm(false);
                          setEditingJob(null);
                          setJobForm({
                            title: '',
                            description: '',
                            location: '',
                            jobType: '',
                            positionsAvailable: 1,
                            deadline: '',
                            requirements: '',
                            paymentType: 'share',
                            upfrontFee: 0,
                            sharePercentage: 20,
                            contactInfo: ''
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Jobs List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{job.location} • {job.job_type}</p>
                      </div>
                      <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">{job.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Positions:</span>
                        <span>{job.positions_available}</span>
                      </div>
                      
                      {job.deadline && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Deadline:</span>
                          <span>{new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment:</span>
                        <span className="flex items-center">
                          {job.payment_type === 'upfront' ? (
                            <>
                              <DollarSign className="h-3 w-3 mr-1" />
                              MWK {job.upfront_fee}
                            </>
                          ) : (
                            <>
                              <Share className="h-3 w-3 mr-1" />
                              {job.share_percentage}% share
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditJob(job)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {jobs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No job postings yet</p>
                  <p className="text-gray-400 mb-4">Create your first job posting to get started.</p>
                  <Button onClick={() => setShowJobForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Job
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other tabs - keeping them minimal for now */}
        {activeTab === 'providers' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Providers ({providers.length})</h2>
            <div className="space-y-4">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.service_category} • {provider.location}</p>
                        <p className="text-sm text-gray-500">{provider.email} • {provider.phone}</p>
                      </div>
                      <Badge variant={provider.verified ? 'default' : 'secondary'}>
                        {provider.verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Requests ({requests.length})</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{request.service_type}</h3>
                        <p className="text-sm text-gray-600">{request.client_name} • {request.location}</p>
                      </div>
                      <div className="flex gap-2">
                        {request.urgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                        <Badge variant="secondary">{request.status}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                    <p className="text-xs text-gray-500">{request.client_email} • {request.client_phone}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages ({messages.length})</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {message.subject && (
                      <p className="text-sm font-medium text-gray-800 mb-1">{message.subject}</p>
                    )}
                    <p className="text-sm text-gray-700">{message.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
