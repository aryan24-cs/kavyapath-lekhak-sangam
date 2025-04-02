
import React from "react";
import { BookOpen, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BookOpen className="w-5 h-5 text-kavya-orange" />
            <h2 className="text-lg font-bold">
              <span className="text-kavya-orange">काव्य</span>
              <span>पथ</span>
            </h2>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              होम
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              श्रेणियाँ
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              लेखक
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              हमारे बारे में
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              संपर्क
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              गोपनीयता
            </a>
          </nav>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>बनाया गया</span>
            <Heart className="w-4 h-4 text-kavya-red" />
            <span>के साथ</span>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} कविपथ। सभी अधिकार सुरक्षित।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
