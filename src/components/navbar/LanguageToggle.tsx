
import React from "react";
import { Switch } from "@/components/ui/switch";

type LanguageToggleProps = {
  isHindi: boolean;
  toggleLanguage: () => void;
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({ isHindi, toggleLanguage }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{isHindi ? "हिंदी" : "EN"}</span>
      <Switch 
        checked={!isHindi} 
        onCheckedChange={toggleLanguage} 
        aria-label="Toggle language"
      />
    </div>
  );
};

export default LanguageToggle;
