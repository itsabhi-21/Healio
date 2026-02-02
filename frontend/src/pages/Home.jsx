import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ProcessSection from '../components/home/ProcessSection';
import TrustSection from '../components/home/TrustSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/common/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with gradient background */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-100">
        <HeroSection />
      </div>
      <FeaturesSection />
      
      <ProcessSection />
      
      <TrustSection />
      
      <CTASection />

      <Footer/>
    </div>
  );
}