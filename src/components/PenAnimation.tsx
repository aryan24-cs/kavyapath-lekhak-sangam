
import React from "react";
import { PenLine } from "lucide-react";

const PenAnimation = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative h-16 w-16 animate-float">
        <PenLine className="absolute h-full w-full text-kavya-pink animate-pulse" />
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-kavya-purple rounded-full animate-ping" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-kavya-pink to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PenAnimation;
