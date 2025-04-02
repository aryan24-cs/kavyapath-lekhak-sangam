
import React from "react";
import { Music2, MusicIcon } from "lucide-react";

const MusicBeats = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center gap-3 h-20 ${className}`}>
      <div className="relative">
        <MusicIcon className="w-8 h-8 text-kavya-pink animate-bounce" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-kavya-purple animate-ping opacity-20" />
        </div>
      </div>
      
      <div className="flex items-end gap-1 h-16">
        <div className="w-2 h-6 bg-gradient-to-t from-kavya-pink to-purple-500 rounded-full animate-music-beat-1 shadow-glow"></div>
        <div className="w-2 h-10 bg-gradient-to-t from-purple-500 to-kavya-pink rounded-full animate-music-beat-2 shadow-glow"></div>
        <div className="w-2 h-14 bg-gradient-to-t from-kavya-pink to-blue-400 rounded-full animate-music-beat-3 shadow-glow"></div>
        <div className="w-2 h-16 bg-gradient-to-t from-blue-400 to-kavya-pink rounded-full animate-music-beat-4 shadow-glow"></div>
        <div className="w-2 h-14 bg-gradient-to-t from-kavya-pink to-green-400 rounded-full animate-music-beat-5 shadow-glow"></div>
        <div className="w-2 h-10 bg-gradient-to-t from-green-400 to-kavya-pink rounded-full animate-music-beat-3 shadow-glow"></div>
        <div className="w-2 h-6 bg-gradient-to-t from-kavya-pink to-yellow-400 rounded-full animate-music-beat-1 shadow-glow"></div>
      </div>
      
      <div className="relative">
        <Music2 className="w-8 h-8 text-kavya-purple animate-bounce" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-kavya-pink animate-ping opacity-20" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
};

export default MusicBeats;
