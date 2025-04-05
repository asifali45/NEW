
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark_card/50 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-gradient">
              FormOCR
            </h3>
            <p className="text-light_text/70 text-sm max-w-xs">
              Transform your documents into actionable data with our advanced form extraction technology.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-light_text">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admission-form"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Admission Form
                </Link>
              </li>
              <li>
                <Link
                  to="/biodata"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Biodata
                </Link>
              </li>
              <li>
                <Link
                  to="/bank-account"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Bank Account Opening
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-light_text">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-light_text">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light_text/70 hover:text-primary_green text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-light_text/50">
          <p>© {currentYear} FormOCR. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-primary_green transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary_green transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
