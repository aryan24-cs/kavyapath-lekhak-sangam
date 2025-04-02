
import React from "react";
import { getCategory } from "@/data/poems";

type CategoryBadgeProps = {
  categoryId: string;
  className?: string;
};

const CategoryBadge = ({ categoryId, className = "" }: CategoryBadgeProps) => {
  const category = getCategory(categoryId);
  
  if (!category) return null;
  
  // Use more vibrant colors for badges
  const getBadgeColor = (categoryId: string) => {
    switch(categoryId) {
      case "love":
        return "bg-gradient-to-r from-pink-500 to-purple-500 text-white";
      case "patriotic":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white";
      case "nature":
        return "bg-gradient-to-r from-green-400 to-cyan-500 text-white";
      case "spiritual":
        return "bg-gradient-to-r from-amber-500 to-pink-500 text-white";
      default:
        return "bg-gradient-to-r from-kavya-pink to-kavya-purple text-white";
    }
  };
  
  return (
    <span className={`category-badge ${getBadgeColor(categoryId)} ${className} fade-in-up shadow-md`}>
      {category.name}
    </span>
  );
};

export default CategoryBadge;
