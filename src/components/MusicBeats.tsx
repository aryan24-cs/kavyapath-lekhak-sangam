
import React from "react";

const MusicBeats = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center gap-1 h-20 ${className}`}>
      <div className="w-2 h-6 bg-gradient-to-t from-kavya-pink to-purple-500 rounded-full animate-music-beat-1"></div>
      <div className="w-2 h-10 bg-gradient-to-t from-purple-500 to-kavya-pink rounded-full animate-music-beat-2"></div>
      <div className="w-2 h-14 bg-gradient-to-t from-kavya-pink to-blue-400 rounded-full animate-music-beat-3"></div>
      <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-kavya-pink rounded-full animate-music-beat-4"></div>
      <div className="w-2 h-16 bg-gradient-to-t from-kavya-pink to-green-400 rounded-full animate-music-beat-5"></div>
      <div className="w-2 h-12 bg-gradient-to-t from-green-400 to-kavya-pink rounded-full animate-music-beat-3"></div>
      <div className="w-2 h-8 bg-gradient-to-t from-kavya-pink to-yellow-400 rounded-full animate-music-beat-1"></div>
    </div>
  );
};

export default MusicBeats;
