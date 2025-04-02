
import React from "react";
import { getCategory } from "@/data/poems";

type CategoryBadgeProps = {
  categoryId: string;
  className?: string;
};

const CategoryBadge = ({ categoryId, className = "" }: CategoryBadgeProps) => {
  const category = getCategory(categoryId);
  
  if (!category) return null;
  
  // Use our new color scheme for badges
  const getBadgeColor = (categoryId: string) => {
    switch(categoryId) {
      case "love":
        return "bg-kavya-pink text-white";
      case "patriotic":
        return "bg-kavya-purple text-white";
      case "nature":
        return "bg-kavya-lavender text-white";
      case "spiritual":
        return "bg-kavya-darkblue text-white";
      default:
        return "bg-kavya-lightpink text-kavya-darkblue";
    }
  };
  
  return (
    <span className={`category-badge ${getBadgeColor(categoryId)} ${className} fade-in-up`}>
      {category.name}
    </span>
  );
};

export default CategoryBadge;
