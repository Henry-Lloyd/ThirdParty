import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, UserCheck, CheckCircle, Star } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Submit Application',
    description: 'Fill out the registration form with your details and service information.',
    time: '5 minutes'
  },
  {
    icon: UserCheck,
    title: 'Verification Process',
    description: 'We verify your credentials, references, and conduct background checks.',
    time: '24-48 hours'
  },
  {
    icon: CheckCircle,
    title: 'Profile Approval',
    description: 'Once approved, your profile goes live and customers can find you.',
    time: 'Immediate'
  },
  {
    icon: Star,
    title: 'Start Earning',
    description: 'Begin receiving service requests and building your reputation.',
    time: 'Right away'
  }
];

export function RegistrationProcess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">How It Works</CardTitle>
        <p className="text-gray-600">
          Simple steps to get started as a verified service provider on ThirdParty.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-3">📋 What You'll Need:</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-3"></span>
              Valid Malawian ID or Business Registration
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-3"></span>
              Professional certificates (if applicable)
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-3"></span>
              References from previous clients
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-3"></span>
              Examples of your work (photos/portfolio)
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Questions about registration? 
            <a href="https://wa.me/+265991451188" className="text-blue-600 hover:underline ml-1">
              WhatsApp us
            </a> for support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
