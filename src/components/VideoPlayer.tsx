
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Play, Pause, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

interface VideoPlayerProps {
  initialVideo?: string;
  onSave: (videoUrl: string) => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  initialVideo,
  onSave,
  onDelete,
  isEditable = false,
}) => {
  const [videoUrl, setVideoUrl] = useState<string | undefined>(initialVideo);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("video/")) {
      toast.error("कृपया केवल वीडियो फ़ाइल अपलोड करें");
      return;
    }

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("वीडियो फ़ाइल का आकार 100MB से कम होना चाहिए");
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    onSave(url);
    toast.success("वीडियो सफलतापूर्वक अपलोड हो गया");
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleDeleteVideo = () => {
    if (onDelete) onDelete();
    setVideoUrl(undefined);
    toast.success("वीडियो सफलतापूर्वक हटा दिया गया");
  };

  const handleEditVideo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      {videoUrl ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full rounded-lg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls={!isEditable}
          />
          
          {isEditable && (
            <div className="absolute top-2 right-2 flex gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleEditVideo}
              >
                <Edit className="w-4 h-4 mr-1" /> संपादित करें
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={handleDeleteVideo}
              >
                <Trash2 className="w-4 h-4 mr-1" /> हटाएं
              </Button>
            </div>
          )}
          
          {isEditable && (
            <div className="absolute bottom-2 left-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <><Pause className="w-4 h-4 mr-1" /> रोकें</>
                ) : (
                  <><Play className="w-4 h-4 mr-1" /> चलाएं</>
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isEditable ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mx-auto flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>वीडियो अपलोड करें</span>
              </Button>
              <p className="text-sm text-muted-foreground mt-2">अधिकतम आकार: 100MB</p>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Play className="w-4 h-4 mr-2" /> वीडियो देखें
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>कोई वीडियो उपलब्ध नहीं है</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">इस कविता के लिए कोई वीडियो उपलब्ध नहीं है</p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
