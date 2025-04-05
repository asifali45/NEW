
import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElements = document.querySelectorAll(".hero-animate");
    heroElements.forEach((el) => observer.observe(el));

    return () => {
      heroElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 -left-1/4 w-2/3 h-2/3 bg-primary_green/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary_green/10 blur-[100px] rounded-full" />
      
      <div className="max-w-6xl mx-auto text-center z-10 px-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="inline-block">
            <span className="bg-primary_green/20 backdrop-blur-sm text-primary_green text-xs font-medium px-3 py-1 rounded-full border border-primary_green/20 hero-animate opacity-0 translate-y-10 transition-all duration-700">
              Intelligent Document Processing
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold hero-animate opacity-0 translate-y-10 transition-all duration-700 delay-150">
            <span className="text-gradient">Form</span>EASE
          </h1>
          
          <p className="text-xl md:text-2xl text-light_text/80 max-w-2xl hero-animate opacity-0 translate-y-10 transition-all duration-700 delay-300">
            Transform your documents into actionable data with our advanced extraction technology
          </p>
          
          <button 
            onClick={scrollToFeatures}
            className="px-7 py-3 mt-4 bg-primary_green text-white font-medium rounded-full hover:shadow-glow transition-all duration-300 flex items-center space-x-2 hero-animate opacity-0 translate-y-10 transition-all duration-700 delay-450"
          >
            <span>Get Started</span>
            <ArrowDown className="w-4 h-4 ml-1 animate-pulse" />
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center hero-animate opacity-0 translate-y-10 transition-all duration-700 delay-600">
        <span className="text-light_text/50 text-sm mb-2">Scroll to explore</span>
        <ArrowDown className="w-5 h-5 text-light_text/50 animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;
