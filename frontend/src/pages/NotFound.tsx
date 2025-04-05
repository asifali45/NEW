
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark_bg p-6">
      <div className="max-w-md w-full glass-card p-10 text-center">
        <div className="space-y-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-primary_green/20 flex items-center justify-center mx-auto">
              <span className="text-5xl font-bold text-primary_green">404</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary_green rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-display font-bold">Page Not Found</h1>
            <p className="text-light_text/70">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <Link to="/">
            <Button className="bg-primary_green hover:bg-primary_green/90 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
