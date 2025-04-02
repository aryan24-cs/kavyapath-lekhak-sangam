
import React from "react";
import { PenLine, BookOpen, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { categories } from "@/data/categories";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            होम
          </Link>
          <div className="relative group">
            <button className="nav-link flex items-center gap-1">
              श्रेणियाँ
            </button>
            <div className="absolute z-10 left-0 mt-2 w-48 hidden group-hover:block bg-card border border-border rounded-md shadow-lg p-2">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                >
                  {category.name} ({category.nameEn})
                </a>
              ))}
            </div>
          </div>
          <a href="#" className="nav-link">
            लेखक
          </a>
          <a href="#" className="nav-link">
            नई कविताएँ
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/signin">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              <span>लॉग इन</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-primary hidden md:flex items-center gap-1">
              <PenLine className="w-4 h-4" />
              <span>लिखें</span>
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
