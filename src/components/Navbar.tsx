
import React, { useState } from "react";
import { PenLine, BookOpen, User, LogIn, Users, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { categories } from "@/data/categories";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

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
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-kavya-pink" />
            <h1 className="text-xl font-bold">
              <span className="text-kavya-pink">काव्य</span>
              <span>पथ</span>
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">
            {getLanguageText("होम", "Home")}
          </Link>
          <div className="relative group">
            <Link to="/categories" className="nav-link flex items-center gap-1">
              {getLanguageText("श्रेणियाँ", "Categories")}
            </Link>
            <div className="absolute z-10 left-0 mt-2 w-48 hidden group-hover:block bg-card border border-border rounded-md shadow-lg p-2">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/categories#${category.id}`}
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                >
                  {isHindi ? category.name : category.nameEn}
                </a>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button className="nav-link flex items-center gap-1">
              {getLanguageText("लेखक", "Authors")}
            </button>
            <div className="absolute z-10 left-0 mt-2 w-48 hidden group-hover:block bg-card border border-border rounded-md shadow-lg p-2">
              <Link
                to="/famous-poets"
                className="block px-4 py-2 text-sm hover:bg-accent rounded-md flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>{getLanguageText("प्रसिद्ध कवि", "Famous Poets")}</span>
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
              >
                {getLanguageText("नए लेखक", "New Authors")}
              </a>
            </div>
          </div>
          <a href="#" className="nav-link">
            {getLanguageText("नई कविताएँ", "New Poems")}
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">{isHindi ? "हिंदी" : "EN"}</span>
            <Switch 
              checked={!isHindi} 
              onCheckedChange={toggleLanguage} 
              aria-label="Toggle language"
            />
          </div>
          
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
      </div>
    </header>
  );
};

export default Navbar;
