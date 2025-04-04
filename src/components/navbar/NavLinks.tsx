
import React from "react";
import { Link } from "react-router-dom";
import { Users, Music } from "lucide-react";
import { categories } from "@/data/categories";
import PoetSearch from "./PoetSearch";

type NavLinksProps = {
  isHindi: boolean;
  getLanguageText: (hindiText: string, englishText: string) => string;
};

const NavLinks: React.FC<NavLinksProps> = ({ isHindi, getLanguageText }) => {
  return (
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
          <PoetSearch isHindi={isHindi} getLanguageText={getLanguageText} />
          
          <Link
            to="/famous-poets"
            className="block px-4 py-2 text-sm hover:bg-accent rounded-md flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>{getLanguageText("प्रसिद्ध कवि", "Famous Poets")}</span>
          </Link>
        </div>
      </div>
      <Link to="/spiritual-poems" className="nav-link flex items-center gap-1">
        <Music className="w-4 h-4" />
        <span>{getLanguageText("आध्यात्मिक काव्य", "Spiritual Poems")}</span>
      </Link>
    </nav>
  );
};

export default NavLinks;
