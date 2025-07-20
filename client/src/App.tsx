import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { RegisterProviderPage } from '@/pages/RegisterProviderPage';
import { RequestServicePage } from '@/pages/RequestServicePage';
import { SearchResultsPage } from '@/pages/SearchResultsPage';
import { JobLinksPage } from '@/pages/JobLinksPage';
import { CareersPage } from '@/pages/CareersPage';
import { BlogsPage } from '@/pages/BlogsPage';
import { BlogDetailPage } from '@/pages/BlogDetailPage';
import { AdminPage } from '@/pages/AdminPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { SystemTestPage } from '@/pages/SystemTestPage';
import { TestRequestPage } from '@/pages/TestRequestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin routes without header/footer */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/system-test" element={<SystemTestPage />} />
          <Route path="/test-request" element={<TestRequestPage />} />
          
          {/* Public routes with header/footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/job-links" element={<JobLinksPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/register-provider" element={<RegisterProviderPage />} />
                  <Route path="/request-service" element={<RequestServicePage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
