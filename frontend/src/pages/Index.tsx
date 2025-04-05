
import React, { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Users, CreditCard } from "lucide-react";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const features = [
    {
      title: "Admission Form",
      description: "Extract and process student admission forms with precision and speed.",
      icon: <FileText className="w-5 h-5" />,
      route: "/admission-form",
    },
    {
      title: "Biodata",
      description: "Efficiently extract personal information from biodata forms.",
      icon: <Users className="w-5 h-5" />,
      route: "/biodata",
    },
    {
      title: "Bank Account Opening",
      description: "Streamline account opening by extracting form data instantly.",
      icon: <CreditCard className="w-5 h-5" />,
      route: "/bank-account",
    },
  ];
  
  // Remove the animation observation and make cards visible by default
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <div 
        id="features" 
        className="section-padding relative"
      >
        {/* Background gradients */}
        <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-primary_green/10 blur-[150px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-primary_green/20 backdrop-blur-sm text-primary_green text-xs font-medium px-3 py-1 rounded-full border border-primary_green/20 mb-4 inline-block">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Transform Your <span className="text-gradient">Documents</span>
            </h2>
            <p className="text-light_text/70 max-w-2xl mx-auto">
              Our intelligent document processing solutions help you extract and analyze data from various form types.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                route={feature.route}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
