
import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import PoemCard from "@/components/PoemCard";
import { useTheme } from "@/contexts/ThemeContext";
import { spiritualPoems } from "@/data/spiritualPoems";
import { toast } from "@/hooks/use-toast";

const SpiritualPoems = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    audioRef.current = new Audio("/sounds/om-chanting.mp3");
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "ध्वनि चलाने में समस्या",
            description: "कृपया पेज को दोबारा लोड करें या बाद में प्रयास करें",
            variant: "destructive"
          });
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="relative">
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMusic}
              className="flex items-center gap-2"
            >
              {isMusicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span>{isMusicPlaying ? "मंत्र बंद करें" : "ॐ मंत्र चालू करें"}</span>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mb-8 text-center hindi-text">
            आध्यात्मिक काव्य
          </h1>
          
          <div className="mb-6 text-center text-lg">
            <p className="mb-4">
              आध्यात्मिक कविताएँ आत्मा और परमात्मा के बीच के संबंध को दर्शाती हैं।
              इन कविताओं में आध्यात्मिक ज्ञान, ईश्वरीय प्रेम और मोक्ष की झलक मिलती है।
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {spiritualPoems.map((poem) => (
              <PoemCard 
                key={poem.id} 
                poem={poem} 
                audioType="spiritual"
                allowComments={true}
                allowSave={true}
                allowLike={true}
                allowShare={true}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpiritualPoems;
