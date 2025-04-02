
import React from "react";
import { PenLine, BookOpen, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { categories } from "@/data/categories";

const Navbar = () => {
  return (
    <header className="border-b border-border">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-kavya-orange" />
          <h1 className="text-xl font-bold">
            <span className="text-kavya-orange">काव्य</span>
            <span>पथ</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="nav-link">
            होम
          </a>
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
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <LogIn className="w-4 h-4" />
            <span>लॉग इन</span>
          </Button>
          <Button className="btn-primary hidden md:flex items-center gap-1">
            <PenLine className="w-4 h-4" />
            <span>लिखें</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
