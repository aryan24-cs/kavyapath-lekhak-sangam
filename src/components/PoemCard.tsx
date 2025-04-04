
import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, BookOpen, Image } from "lucide-react";
import { Poem } from "@/data/poems";
import CategoryBadge from "./CategoryBadge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";

type PoemCardProps = {
  poem: Poem;
};

const PoemCard = ({ poem }: PoemCardProps) => {
  // Format date to relative time (e.g., "2 days ago")
  const timeAgo = formatDistanceToNow(new Date(poem.createdAt), { addSuffix: true });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(poem.backgroundImage || null);
  const { theme } = useTheme();
  
  const speakPoem = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(poem.content);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div className={`poem-card animate-fade-in slide-in-right ${backgroundImage ? 'overflow-hidden' : ''}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            opacity: 0.2
          }}
        />
      )}
      
      <div className="relative z-10">
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
        
        <h2 className="text-xl font-bold mb-3 hindi-text text-kavya-darkblue dark:text-kavya-lightpink">{poem.title}</h2>
        
        <Tabs defaultValue="poem">
          <TabsList className="mb-4">
            <TabsTrigger value="poem">कविता</TabsTrigger>
            <TabsTrigger value="meaning">अर्थ</TabsTrigger>
          </TabsList>
          <TabsContent value="poem">
            <div className="poem-text whitespace-pre-line mb-6 text-lg fade-in-up text-kavya-darkblue dark:text-white">
              {poem.content}
            </div>
          </TabsContent>
          <TabsContent value="meaning">
            <div className="whitespace-pre-line mb-6 text-md fade-in-up">
              {poem.meaning ? poem.meaning.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              )) : (
                <p className="text-muted-foreground italic">इस कविता का अर्थ अभी उपलब्ध नहीं है।</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={speakPoem} className="flex items-center gap-1">
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? "बंद करें" : "सुनें"}</span>
          </Button>
          
          <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-pink transition-colors">
            <Heart className="w-5 h-5" />
            <span>{poem.likes}</span>
          </button>
          
          <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-pink transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{poem.comments}</span>
          </button>
          
          <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-pink transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;
