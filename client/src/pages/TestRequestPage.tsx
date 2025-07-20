import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Send, Eye } from 'lucide-react';

export function TestRequestPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [adminData, setAdminData] = React.useState<any>(null);

  const submitTestRequest = async () => {
    setIsSubmitting(true);
    setResult(null);
    
    try {
      console.log('=== SUBMITTING TEST SERVICE REQUEST ===');
      
      const testData = {
        clientName: `Test Client ${Date.now()}`,
        clientEmail: `test${Date.now()}@example.com`,
        clientPhone: '+265991451188',
        serviceType: 'Emergency Plumbing',
        location: 'Blantyre',
        description: 'This is a test service request to verify the connection between the form and admin page.',
        urgent: true
      };

      console.log('Test data:', testData);

      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      setResult({
        success: response.ok,
        status: response.status,
        data: data,
        testData: testData
      });

      console.log('=== TEST SERVICE REQUEST COMPLETE ===');
    } catch (error) {
      console.error('=== TEST SERVICE REQUEST ERROR ===');
      console.error('Error:', error);
      setResult({
        success: false,
        error: error.message,
        status: 'Network Error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkAdminData = async () => {
    try {
      console.log('=== CHECKING ADMIN DATA ===');
      
      // First try to login
      const loginResponse = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'henrylloyd190@gmail.com',
          password: 'Ae123456@1'
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('Admin login failed');
      }

      const loginData = await loginResponse.json();
      console.log('Login successful:', loginData);

      // Now fetch the service requests
      const requestsResponse = await fetch('/api/admin/requests', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!requestsResponse.ok) {
        throw new Error('Failed to fetch admin requests');
      }

      const requestsData = await requestsResponse.json();
      console.log('Admin requests data:', requestsData);

      setAdminData({
        success: true,
        requests: requestsData,
        count: requestsData.length
      });

      console.log('=== ADMIN DATA CHECK COMPLETE ===');
    } catch (error) {
      console.error('=== ADMIN DATA CHECK ERROR ===');
      console.error('Error:', error);
      setAdminData({
        success: false,
        error: error.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Service Request to Admin Page Test
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Submit Test Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-blue-600" />
                  Step 1: Submit Test Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Click the button below to submit a test service request. This will test the form submission endpoint.
                </p>
                
                <Button 
                  onClick={submitTestRequest}
                  disabled={isSubmitting}
                  className="w-full mb-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Test Request
                    </>
                  )}
                </Button>

                {result && (
                  <div className={`border rounded-lg p-4 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-center mb-2">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <span className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                        {result.success ? 'Success!' : 'Failed'}
                      </span>
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <div>Status: {result.status}</div>
                      {result.data && (
                        <div>
                          <div>Response:</div>
                          <pre className="bg-white p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )}
                      {result.error && (
                        <div className="text-red-700">Error: {result.error}</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Check Admin Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-green-600" />
                  Step 2: Check Admin Page
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Click the button below to fetch data from the admin endpoint and verify the request appears.
                </p>
                
                <Button 
                  onClick={checkAdminData}
                  variant="outline"
                  className="w-full mb-4"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Check Admin Data
                </Button>

                {adminData && (
                  <div className={`border rounded-lg p-4 ${adminData.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-center mb-2">
                      {adminData.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <span className={`font-semibold ${adminData.success ? 'text-green-800' : 'text-red-800'}`}>
                        {adminData.success ? 'Admin Data Retrieved!' : 'Failed to Get Admin Data'}
                      </span>
                    </div>
                    
                    <div className="text-sm space-y-2">
                      {adminData.success && (
                        <div>
                          <div>Total Requests: {adminData.count}</div>
                          {adminData.requests && adminData.requests.length > 0 && (
                            <div>
                              <div className="font-medium mt-2">Recent Requests:</div>
                              <div className="space-y-1 max-h-40 overflow-auto">
                                {adminData.requests.slice(0, 5).map((req: any, index: number) => (
                                  <div key={index} className="bg-white p-2 rounded text-xs">
                                    <div><strong>{req.client_name}</strong> - {req.service_type}</div>
                                    <div className="text-gray-600">{req.location} | {req.urgent ? 'URGENT' : 'Normal'}</div>
                                    <div className="text-gray-500">{new Date(req.created_at).toLocaleString()}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {adminData.error && (
                        <div className="text-red-700">Error: {adminData.error}</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">What this test does:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Submits a test service request using the same endpoint as the actual form</li>
                    <li>Verifies the request was saved to the database</li>
                    <li>Logs in to the admin panel using the admin credentials</li>
                    <li>Fetches the service requests from the admin endpoint</li>
                    <li>Displays the results to verify the complete flow works</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Expected Results:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Step 1 should return a success response with an ID</li>
                    <li>Step 2 should show the admin data including the newly created request</li>
                    <li>The request should appear in the admin panel at <code>/admin</code></li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
                  <p className="text-blue-700 text-sm">
                    After running this test successfully, try:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm mt-2">
                    <li>Submit a request through the actual form at <code>/request-service</code></li>
                    <li>Login to the admin panel at <code>/admin</code></li>
                    <li>Verify the request appears in the admin dashboard</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
