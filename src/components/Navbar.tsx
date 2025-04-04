
import React, { useState } from "react";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import LanguageToggle from "./navbar/LanguageToggle";
import ActionButtons from "./navbar/ActionButtons";

const Navbar = () => {
  const [isHindi, setIsHindi] = useState(true);

  const toggleLanguage = () => {
    setIsHindi(!isHindi);
  };

  const getLanguageText = (hindiText: string, englishText: string) => {
    return isHindi ? hindiText : englishText;
  };

  return (
    <header className="border-b border-border">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        
        <NavLinks 
          isHindi={isHindi} 
          getLanguageText={getLanguageText} 
        />
        
        <div className="flex items-center gap-3">
          <LanguageToggle 
            isHindi={isHindi} 
            toggleLanguage={toggleLanguage} 
          />
          
          <ActionButtons 
            getLanguageText={getLanguageText} 
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
