
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  route,
  index,
}) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card card-hover p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="bg-primary_green/20 p-3 rounded-xl text-primary_green">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-light_text/70 text-sm flex-grow mb-6">
        {description}
      </p>
      <button
        onClick={() => navigate(route)}
        className="mt-auto self-start flex items-center text-primary_green font-medium text-sm hover:underline transition-all group"
      >
        <span>Go</span>
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default FeatureCard;
