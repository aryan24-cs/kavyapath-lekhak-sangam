
import React from "react";
import { Link } from "react-router-dom";
import { PenLine, LogIn, LayoutDashboard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";

type ActionButtonsProps = {
  getLanguageText: (hindiText: string, englishText: string) => string;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ getLanguageText }) => {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      
      <Link to="/dashboard">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden md:flex"
          title={getLanguageText("डैशबोर्ड", "Dashboard")}
        >
          <LayoutDashboard className="w-5 h-5" />
        </Button>
      </Link>
      
      <Link to="/signin">
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
          <LogIn className="w-4 h-4" />
          <span>{getLanguageText("लॉग इन", "Log In")}</span>
        </Button>
      </Link>
      
      <Link to="/signup">
        <Button className="btn-primary hidden md:flex items-center gap-1">
          <PenLine className="w-4 h-4" />
          <span>{getLanguageText("लिखें", "Write")}</span>
        </Button>
      </Link>
      
      <Link to="/dashboard">
        <Button variant="ghost" size="icon" className="md:hidden">
          <User className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};

export default ActionButtons;
