
import React from "react";

const MusicBeats = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-end justify-center h-20 ${className}`}>
      <div className="music-beat-bar animate-music-beat-1"></div>
      <div className="music-beat-bar animate-music-beat-2"></div>
      <div className="music-beat-bar animate-music-beat-3"></div>
      <div className="music-beat-bar animate-music-beat-4"></div>
      <div className="music-beat-bar animate-music-beat-5"></div>
      <div className="music-beat-bar animate-music-beat-3"></div>
      <div className="music-beat-bar animate-music-beat-1"></div>
    </div>
  );
};

export default MusicBeats;
