
import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, BookOpen, Image, BookmarkPlus, BookmarkCheck, Send, Twitter, Instagram } from "lucide-react";
import { Poem } from "@/data/poems";
import CategoryBadge from "./CategoryBadge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type PoemCardProps = {
  poem: Poem;
  audioType?: "spiritual" | "romantic" | "patriotic" | "sad" | "calm";
  allowComments?: boolean;
  allowSave?: boolean;
  allowLike?: boolean;
  allowShare?: boolean;
};

// Get from localStorage or initialize
const getLocalStorageArray = (key: string) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

// Save to localStorage
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const PoemCard = ({ 
  poem, 
  audioType,
  allowComments = false,
  allowSave = false,
  allowLike = false,
  allowShare = false
}: PoemCardProps) => {
  // Format date to relative time (e.g., "2 days ago")
  const timeAgo = formatDistanceToNow(new Date(poem.createdAt), { addSuffix: true });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(poem.backgroundImage || null);
  const { theme } = useTheme();
  const [likes, setLikes] = useState(poem.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState<{id: string, text: string, author: string, date: string}[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    const likedPoems = getLocalStorageArray('likedPoems');
    setIsLiked(likedPoems.includes(poem.id));
    
    const savedPoems = getLocalStorageArray('savedPoems');
    setIsSaved(savedPoems.includes(poem.id));
    
    const allComments = getLocalStorageArray('poemComments');
    const poemComments = allComments.filter((c: any) => c.poemId === poem.id);
    setComments(poemComments);
  }, [poem.id]);
  
  // Initialize background audio based on poem type
  useEffect(() => {
    if (audioType) {
      let audioPath = "";
      switch (audioType) {
        case "spiritual":
          audioPath = "/sounds/om-chanting.mp3";
          break;
        case "romantic":
          audioPath = "/sounds/soft-piano.mp3";
          break;
        case "patriotic":
          audioPath = "/sounds/patriotic.mp3";
          break;
        case "sad":
          audioPath = "/sounds/rain.mp3";
          break;
        case "calm":
          audioPath = "/sounds/birds-chirping.mp3";
          break;
      }
      
      if (audioPath) {
        backgroundAudioRef.current = new Audio(audioPath);
        backgroundAudioRef.current.loop = true;
        backgroundAudioRef.current.volume = 0.3;
      }
    }
    
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current = null;
      }
    };
  }, [audioType]);
  
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

  const toggleBackgroundMusic = () => {
    if (backgroundAudioRef.current) {
      if (isBackgroundMusicPlaying) {
        backgroundAudioRef.current.pause();
      } else {
        backgroundAudioRef.current.play().catch(error => {
          console.error("Error playing background audio:", error);
          toast({
            title: "ध्वनि चलाने में समस्या",
            description: "कृपया पेज को दोबारा लोड करें या बाद में प्रयास करें",
            variant: "destructive"
          });
        });
      }
      setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying);
    }
  };

  const handleLike = () => {
    if (!allowLike) return;
    
    const likedPoems = getLocalStorageArray('likedPoems');
    
    if (isLiked) {
      // Unlike
      setLikes(prev => prev - 1);
      setIsLiked(false);
      const updatedLikes = likedPoems.filter((id: string) => id !== poem.id);
      saveToLocalStorage('likedPoems', updatedLikes);
    } else {
      // Like
      setLikes(prev => prev + 1);
      setIsLiked(true);
      likedPoems.push(poem.id);
      saveToLocalStorage('likedPoems', likedPoems);
    }
  };

  const handleSave = () => {
    if (!allowSave) return;
    
    const savedPoems = getLocalStorageArray('savedPoems');
    
    if (isSaved) {
      // Unsave
      setIsSaved(false);
      const updatedSaved = savedPoems.filter((id: string) => id !== poem.id);
      saveToLocalStorage('savedPoems', updatedSaved);
      toast({
        title: "कविता हटाई गई",
        description: "कविता को सहेजी हुई कविताओं से हटा दिया गया है",
      });
    } else {
      // Save
      setIsSaved(true);
      savedPoems.push(poem.id);
      saveToLocalStorage('savedPoems', savedPoems);
      toast({
        title: "कविता सहेजी गई",
        description: "कविता को सहेजी हुई कविताओं में जोड़ दिया गया है",
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const allComments = getLocalStorageArray('poemComments');
    
    const comment = {
      id: Date.now().toString(),
      poemId: poem.id,
      text: newComment,
      author: "वर्तमान उपयोगकर्ता", // Current user
      date: new Date().toISOString()
    };
    
    allComments.push(comment);
    saveToLocalStorage('poemComments', allComments);
    
    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  const shareToSocial = (platform: 'twitter' | 'instagram') => {
    let url = '';
    const text = `${poem.title} - ${poem.author.name}\n${poem.content.substring(0, 100)}...`;
    
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    } else if (platform === 'instagram') {
      // Instagram doesn't support direct sharing through URLs like Twitter
      // We'll simulate it with a toast message
      toast({
        title: "इंस्टाग्राम शेयर",
        description: "इंस्टाग्राम पर शेयर करने के लिए स्क्रीनशॉट लें और अपनी स्टोरी में पोस्ट करें"
      });
      return;
    }
    
    window.open(url, '_blank');
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
            {allowComments && <TabsTrigger value="comments">टिप्पणियां</TabsTrigger>}
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
          {allowComments && (
            <TabsContent value="comments">
              <div className="mb-6">
                {comments.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {comments.map(comment => (
                      <div key={comment.id} className="bg-background/50 p-3 rounded-md">
                        <div className="flex justify-between">
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="mt-1">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic mb-4">कोई टिप्पणी नहीं है। पहली टिप्पणी जोड़ें!</p>
                )}
                
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="अपनी टिप्पणी लिखें..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddComment} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={speakPoem} className="flex items-center gap-1">
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? "बंद करें" : "सुनें"}</span>
            </Button>
            
            {audioType && (
              <Button variant="ghost" size="sm" onClick={toggleBackgroundMusic} className="flex items-center gap-1">
                {isBackgroundMusicPlaying ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>संगीत बंद</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>पृष्ठभूमि संगीत</span>
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {allowLike && (
              <button 
                className={`flex items-center gap-1 hover:text-kavya-pink transition-colors ${isLiked ? 'text-kavya-pink' : 'text-muted-foreground'}`}
                onClick={handleLike}
              >
                <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                <span>{likes}</span>
              </button>
            )}
            
            {allowComments && (
              <button 
                className="flex items-center gap-1 text-muted-foreground hover:text-kavya-pink transition-colors"
                onClick={() => setShowComments(prev => !prev)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </button>
            )}
            
            {allowSave && (
              <button
                className={`flex items-center gap-1 hover:text-kavya-pink transition-colors ${isSaved ? 'text-kavya-pink' : 'text-muted-foreground'}`}
                onClick={handleSave}
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
              </button>
            )}
            
            {allowShare && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-kavya-pink transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>शेयर</span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>कविता शेयर करें</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Button 
                      className="flex items-center gap-2" 
                      onClick={() => shareToSocial('twitter')}
                    >
                      <Twitter className="w-5 h-5" />
                      <span>ट्विटर पर शेयर करें</span>
                    </Button>
                    <Button 
                      className="flex items-center gap-2"
                      onClick={() => shareToSocial('instagram')}
                    >
                      <Instagram className="w-5 h-5" />
                      <span>इंस्टाग्राम पर शेयर करें</span>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;
