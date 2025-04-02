
import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Poem } from "@/data/poems";
import CategoryBadge from "./CategoryBadge";
import { formatDistanceToNow } from "date-fns";

type PoemCardProps = {
  poem: Poem;
};

const PoemCard = ({ poem }: PoemCardProps) => {
  // Format date to relative time (e.g., "2 days ago")
  const timeAgo = formatDistanceToNow(new Date(poem.createdAt), { addSuffix: true });

  return (
    <div className="poem-card animate-fade-in slide-in-right">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img
            src={poem.author.avatar}
            alt={poem.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-foreground">{poem.author.name}</h3>
            <p className="text-sm text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <CategoryBadge categoryId={poem.categoryId} />
      </div>
      
      <h2 className="text-xl font-bold mb-3 hindi-text">{poem.title}</h2>
      
      <div className="poem-text whitespace-pre-line mb-6 text-lg fade-in-up">
        {poem.content}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-orange transition-colors">
          <Heart className="w-5 h-5" />
          <span>{poem.likes}</span>
        </button>
        
        <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-orange transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span>{poem.comments}</span>
        </button>
        
        <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-orange transition-colors">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PoemCard;
