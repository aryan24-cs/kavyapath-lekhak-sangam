
import React from "react";
import { getCategory } from "@/data/poems";

type CategoryBadgeProps = {
  categoryId: string;
  className?: string;
};

const CategoryBadge = ({ categoryId, className = "" }: CategoryBadgeProps) => {
  const category = getCategory(categoryId);
  
  if (!category) return null;
  
  return (
    <span className={`category-badge ${category.color} ${className}`}>
      {category.name}
    </span>
  );
};

export default CategoryBadge;
