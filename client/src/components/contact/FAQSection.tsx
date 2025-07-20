import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I register as a service provider?",
    answer: "You can register as a service provider by clicking the 'Join as Provider' button and filling out our registration form. We'll verify your credentials and approve your profile within 24-48 hours."
  },
  {
    question: "Is there a fee to use ThirdParty services?",
    answer: "For service seekers, using ThirdParty is completely free. Service providers pay a small commission only when they successfully complete a job through our platform."
  },
  {
    question: "How do you ensure service providers are trustworthy?",
    answer: "All service providers go through a verification process including background checks, credential verification, and reference checks. We also maintain a rating and review system for ongoing quality assurance."
  },
  {
    question: "What areas do you cover in Malawi?",
    answer: "We currently operate in all three regions of Malawi - Southern (Blantyre, Zomba), Central (Lilongwe, Dedza), and Northern (Mzuzu, Karonga). We're continuously expanding to new areas."
  },
  {
    question: "How quickly can I get a service provider?",
    answer: "For emergency services, we aim to connect you with a provider within 30 minutes. For regular services, you'll typically receive responses within 2-4 hours during business hours."
  },
  {
    question: "What if I'm not satisfied with a service?",
    answer: "We have a dispute resolution process. Contact our support team within 24 hours of service completion, and we'll work with both parties to resolve any issues fairly."
  },
  {
    question: "Can I request services outside normal business hours?",
    answer: "Yes! Many of our providers offer emergency and after-hours services. Emergency services are available 24/7, though additional charges may apply for urgent or out-of-hours requests."
  },
  {
    question: "How do payments work?",
    answer: "Payment terms are agreed upon directly between you and the service provider. We support various payment methods including mobile money (Airtel Money, Mpamba), bank transfers, and cash payments."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about ThirdParty services, registration, and platform usage.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+265991451188"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                WhatsApp Support
              </a>
              <a
                href="mailto:info@thirdparty.mw"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
