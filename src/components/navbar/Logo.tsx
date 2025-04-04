
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <BookOpen className="w-6 h-6 text-kavya-pink" />
      <h1 className="text-xl font-bold">
        <span className="text-kavya-pink">काव्य</span>
        <span>पथ</span>
      </h1>
    </Link>
  );
};

export default Logo;
