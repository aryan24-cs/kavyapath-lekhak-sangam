
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { Bell, BookOpen, Edit, Heart, LogOut, MessageCircle, PenLine, Plus, Save, Settings, Share2, Trash2, Upload, User } from "lucide-react";
import { poems } from "@/data/poems";
import PenAnimation from "@/components/PenAnimation";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define types for user data
interface UserProfile {
  name: string;
  bio: string;
  avatar: string | null;
  isHindi: boolean;
}

interface UserPoem {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  createdAt: string;
  likes: number;
  comments: number;
}

interface SavedPoem {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: string;
    name: string;
  };
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // User profile state
  const [name, setName] = useState("राजेश शर्मा");
  const [bio, setBio] = useState("मैं एक कवि हूँ जो हिंदी और उर्दू में लिखता है। मुझे प्रकृति और प्रेम पर कविताएँ लिखना पसंद है।");
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isHindi, setIsHindi] = useState(true);
  
  // New poem state
  const [newPoemTitle, setNewPoemTitle] = useState("");
  const [newPoemContent, setNewPoemContent] = useState("");
  const [newPoemCategory, setNewPoemCategory] = useState("prem");
  
  // Load saved poems from localStorage or use default
  const [savedPoems, setSavedPoems] = useState<SavedPoem[]>([]);
  
  // User's own poems - load from localStorage or use default
  const [userPoems, setUserPoems] = useState<UserPoem[]>([]);
  
  // Load user profile data from localStorage on component mount
  useEffect(() => {
    // Load user profile
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profileData: UserProfile = JSON.parse(storedProfile);
      setName(profileData.name);
      setBio(profileData.bio);
      setAvatar(profileData.avatar);
      setIsHindi(profileData.isHindi);
    }
    
    // Load user poems
    const storedPoems = localStorage.getItem('userPoems');
    if (storedPoems) {
      setUserPoems(JSON.parse(storedPoems));
    } else {
      // Default poems if none exist
      const defaultPoems = [
        {
          id: "user-1",
          title: "पहली बारिश",
          content: "बादल गरजे, बिजली चमकी\nपहली बूँद धरती पर गिरी\nमन हुआ बच्चा सा मेरा\nयादें पुरानी फिर से जगीं।",
          categoryId: "prakriti",
          createdAt: "2024-01-15T14:30:00Z",
          likes: 45,
          comments: 7
        },
        {
          id: "user-2",
          title: "दो पल का साथ",
          content: "मिले थे हम दो पल के लिए\nकुछ बातें हुईं, कुछ यादें बनीं\nफिर बिछड़ गए हम ना जाने कब तक\nपर वो दो पल अब भी ज़िंदा हैं।",
          categoryId: "prem",
          createdAt: "2024-03-20T09:15:00Z",
          likes: 67,
          comments: 12
        }
      ];
      setUserPoems(defaultPoems);
      localStorage.setItem('userPoems', JSON.stringify(defaultPoems));
    }
    
    // Load saved poems
    const storedSavedPoems = localStorage.getItem('savedPoems');
    if (storedSavedPoems) {
      setSavedPoems(JSON.parse(storedSavedPoems));
    } else {
      // Default saved poems if none exist
      const defaultSavedPoems = poems.slice(0, 2);
      setSavedPoems(defaultSavedPoems);
      localStorage.setItem('savedPoems', JSON.stringify(defaultSavedPoems));
    }
  }, []);
  
  // Save user profile data to localStorage whenever it changes
  useEffect(() => {
    const profileData: UserProfile = {
      name,
      bio,
      avatar,
      isHindi
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }, [name, bio, avatar, isHindi]);
  
  // Save user poems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPoems', JSON.stringify(userPoems));
  }, [userPoems]);
  
  // Save saved poems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedPoems', JSON.stringify(savedPoems));
  }, [savedPoems]);
  
  const getLanguageText = (hindiText: string, englishText: string) => {
    return isHindi ? hindiText : englishText;
  };

  const handleSaveProfile = () => {
    setEditing(false);
    toast({
      title: getLanguageText("प्रोफ़ाइल अपडेट हो गई", "Profile Updated"),
      description: getLanguageText("आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट कर दी गई है।", "Your profile has been successfully updated."),
    });
  };
  
  const handlePublishPoem = () => {
    if (!newPoemTitle || !newPoemContent) {
      toast({
        title: getLanguageText("कृपया सभी फील्ड भरें", "Please fill all fields"),
        description: getLanguageText("कविता का शीर्षक और सामग्री आवश्यक हैं।", "Poem title and content are required."),
        variant: "destructive",
      });
      return;
    }
    
    // Create a new poem object
    const newPoem = {
      id: `user-${Date.now()}`,
      title: newPoemTitle,
      content: newPoemContent,
      categoryId: newPoemCategory,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0
    };
    
    // Add the new poem to userPoems
    const updatedPoems = [newPoem, ...userPoems];
    setUserPoems(updatedPoems);
    
    toast({
      title: getLanguageText("कविता प्रकाशित हुई!", "Poem Published!"),
      description: getLanguageText("आपकी कविता सफलतापूर्वक प्रकाशित हो गई है।", "Your poem has been successfully published."),
    });
    
    setNewPoemTitle("");
    setNewPoemContent("");
    setActiveTab("my-poems");
  };
  
  const handleDeletePoem = (poemId: string) => {
    const updatedPoems = userPoems.filter(poem => poem.id !== poemId);
    setUserPoems(updatedPoems);
    
    toast({
      title: getLanguageText("कविता हटा दी गई", "Poem Deleted"),
      description: getLanguageText("आपकी कविता सफलतापूर्वक हटा दी गई है।", "Your poem has been successfully deleted."),
    });
  };
  
  const handleUnsavePoem = (poemId: string) => {
    const updatedSavedPoems = savedPoems.filter(poem => poem.id !== poemId);
    setSavedPoems(updatedSavedPoems);
    
    toast({
      title: getLanguageText("कविता अनसेव की गई", "Poem Unsaved"),
      description: getLanguageText("कविता आपकी सेव्ड लिस्ट से हटा दी गई है।", "The poem has been removed from your saved list."),
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target) {
          const newAvatar = event.target.result as string;
          setAvatar(newAvatar);
          
          toast({
            title: getLanguageText("प्रोफाइल फोटो अपडेट हुई", "Profile Photo Updated"),
            description: getLanguageText("आपकी प्रोफाइल फोटो सफलतापूर्वक अपलोड हो गई है।", "Your profile photo has been successfully uploaded."),
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogout = () => {
    toast({
      title: getLanguageText("लॉग आउट सफल", "Logout Successful"),
      description: getLanguageText("आप सफलतापूर्वक लॉग आउट हो गए हैं", "You have successfully logged out"),
    });
    navigate('/');
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-5 w-auto">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">{getLanguageText("प्रोफ़ाइल", "Profile")}</span>
              </TabsTrigger>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <PenLine size={16} />
                <span className="hidden sm:inline">{getLanguageText("लिखें", "Write")}</span>
              </TabsTrigger>
              <TabsTrigger value="my-poems" className="flex items-center gap-2">
                <BookOpen size={16} />
                <span className="hidden sm:inline">{getLanguageText("मेरी कविताएँ", "My Poems")}</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Save size={16} />
                <span className="hidden sm:inline">{getLanguageText("सेव की गई", "Saved")}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                <span className="hidden sm:inline">{getLanguageText("सेटिंग्स", "Settings")}</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => navigate("/")}>
                {getLanguageText("वापस होम पेज पर", "Back to Home")}
              </Button>
              <Button 
                size="sm" 
                variant="destructive" 
                className="flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>{getLanguageText("लॉग आउट", "Logout")}</span>
              </Button>
            </div>
          </div>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="relative">
                <div className="absolute right-6 top-6">
                  {editing ? (
                    <Button onClick={handleSaveProfile} variant="default" size="sm">
                      {getLanguageText("सेव करें", "Save")}
                    </Button>
                  ) : (
                    <Button onClick={() => setEditing(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      {getLanguageText("एडिट करें", "Edit")}
                    </Button>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {avatar ? (
                        <AvatarImage src={avatar} alt={name} />
                      ) : (
                        <AvatarFallback className="bg-kavya-purple/20">
                          <User className="w-12 h-12 text-kavya-purple" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {editing && (
                      <div className="absolute -bottom-2 -right-2">
                        <label htmlFor="avatar-upload">
                          <Button size="icon" variant="outline" className="rounded-full w-8 h-8 cursor-pointer">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </label>
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left">
                    {editing ? (
                      <Input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-xl font-bold mb-2"
                      />
                    ) : (
                      <h2 className="text-xl font-bold">{name}</h2>
                    )}
                    {editing ? (
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="text-muted-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground">{bio}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-3">{getLanguageText("आँकड़े", "Statistics")}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">{getLanguageText("कुल कविताएँ", "Total Poems")}</p>
                    <p className="text-2xl font-bold text-kavya-pink">{userPoems.length}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">{getLanguageText("कुल लाइक्स", "Total Likes")}</p>
                    <p className="text-2xl font-bold text-kavya-purple">
                      {userPoems.reduce((total, poem) => total + poem.likes, 0)}
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">{getLanguageText("कुल कमेंट्स", "Total Comments")}</p>
                    <p className="text-2xl font-bold text-kavya-lavender">
                      {userPoems.reduce((total, poem) => total + poem.comments, 0)}
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">{getLanguageText("सब्सक्राइबर्स", "Subscribers")}</p>
                    <p className="text-2xl font-bold text-green-500">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{getLanguageText("सब्सक्राइब्ड कवि", "Subscribed Poets")}</CardTitle>
                <CardDescription>{getLanguageText("आप इन कवियों को फॉलो करते हैं", "You follow these poets")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-kavya-purple/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-kavya-purple" />
                      </div>
                      <div>
                        <p className="font-medium">अनुपम मिश्रा</p>
                        <p className="text-sm text-muted-foreground">42 {getLanguageText("कविताएँ", "poems")}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">{getLanguageText("अनसब्सक्राइब", "Unsubscribe")}</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-kavya-pink/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-kavya-pink" />
                      </div>
                      <div>
                        <p className="font-medium">दीपिका शर्मा</p>
                        <p className="text-sm text-muted-foreground">23 {getLanguageText("कविताएँ", "poems")}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">{getLanguageText("अनसब्सक्राइब", "Unsubscribe")}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Write Tab */}
          <TabsContent value="write" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-kavya-pink" />
                  {getLanguageText("नई कविता लिखें", "Write a New Poem")}
                </CardTitle>
                <CardDescription>
                  {getLanguageText("अपनी भावनाओं को शब्दों में उतारें और दुनिया के साथ साझा करें", 
                                "Express your feelings in words and share them with the world")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <PenAnimation />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {getLanguageText("शीर्षक", "Title")}
                    </label>
                    <Input 
                      placeholder={getLanguageText("अपनी कविता का शीर्षक लिखें", "Write your poem title")}
                      value={newPoemTitle}
                      onChange={(e) => setNewPoemTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {getLanguageText("श्रेणी", "Category")}
                    </label>
                    <select 
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                      value={newPoemCategory}
                      onChange={(e) => setNewPoemCategory(e.target.value)}
                    >
                      <option value="prem">{getLanguageText("प्रेम", "Love")}</option>
                      <option value="prakriti">{getLanguageText("प्रकृति", "Nature")}</option>
                      <option value="deshbhakti">{getLanguageText("देशभक्ति", "Patriotic")}</option>
                      <option value="adhyatm">{getLanguageText("अध्यात्म", "Spiritual")}</option>
                      <option value="virah">{getLanguageText("विरह", "Separation")}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {getLanguageText("कविता", "Poem")}
                    </label>
                    <Textarea 
                      placeholder={getLanguageText("अपनी कविता यहाँ लिखें...", "Write your poem here...")}
                      className="min-h-[200px]"
                      value={newPoemContent}
                      onChange={(e) => setNewPoemContent(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setNewPoemTitle("");
                  setNewPoemContent("");
                }}>
                  {getLanguageText("रीसेट", "Reset")}
                </Button>
                <Button onClick={handlePublishPoem}>
                  {getLanguageText("प्रकाशित करें", "Publish")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* My Poems Tab */}
          <TabsContent value="my-poems" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{getLanguageText("मेरी कविताएँ", "My Poems")}</h2>
              <Button onClick={() => setActiveTab("write")} size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {getLanguageText("नई कविता", "New Poem")}
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {userPoems.length > 0 ? (
                userPoems.map((poem) => (
                  <Card key={poem.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{poem.title}</CardTitle>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {getLanguageText("क्या आप वाकई इस कविता को हटाना चाहते हैं?", "Are you sure you want to delete this poem?")}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {getLanguageText(
                                    "यह क्रिया अपरिवर्तनीय है। यह आपकी कविता को स्थायी रूप से हटा देगी।",
                                    "This action cannot be undone. It will permanently delete your poem."
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{getLanguageText("रद्द करें", "Cancel")}</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                                  onClick={() => handleDeletePoem(poem.id)}
                                >
                                  {getLanguageText("हटाएँ", "Delete")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <CardDescription>
                        {new Date(poem.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line">{poem.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-kavya-pink" />
                          <span>{poem.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-kavya-purple" />
                          <span>{poem.comments}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 border border-dashed border-border rounded-lg">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    {getLanguageText("आपने अभी तक कोई कविता नहीं लिखी है।", "You haven't written any poems yet.")}
                  </p>
                  <Button onClick={() => setActiveTab("write")} variant="outline" className="mt-4">
                    {getLanguageText("पहली कविता लिखें", "Write your first poem")}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Saved Poems Tab */}
          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-xl font-bold">{getLanguageText("सेव की गई कविताएँ", "Saved Poems")}</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {savedPoems.length > 0 ? (
                savedPoems.map((poem) => (
                  <Card key={poem.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{poem.title}</CardTitle>
                          <CardDescription>
                            {getLanguageText("कवि", "Poet")}: {poem.author.name}
                          </CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Save className="h-4 w-4 fill-current" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {getLanguageText("क्या आप वाकई इस कविता को अनसेव करना चाहते हैं?", "Are you sure you want to unsave this poem?")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {getLanguageText(
                                  "यह कविता आपके सेव्ड लिस्ट से हटा दी जाएगी।",
                                  "This poem will be removed from your saved list."
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{getLanguageText("रद्द करें", "Cancel")}</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleUnsavePoem(poem.id)}>
                                {getLanguageText("अनसेव करें", "Unsave")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line">{poem.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-kavya-pink" />
                          <span>{poem.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-kavya-purple" />
                          <span>{poem.comments}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 border border-dashed border-border rounded-lg">
                  <Save className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    {getLanguageText("आपने अभी तक कोई कविता सेव नहीं की है।", "You haven't saved any poems yet.")}
                  </p>
                  <Button onClick={() => navigate("/")} variant="outline" className="mt-4">
                    {getLanguageText("कविताएँ ब्राउज़ करें", "Browse poems")}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{getLanguageText("भाषा सेटिंग्स", "Language Settings")}</CardTitle>
                <CardDescription>{getLanguageText("अपनी पसंदीदा भाषा चुनें", "Choose your preferred language")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{getLanguageText("इंटरफेस भाषा", "Interface Language")}</label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{getLanguageText("हिंदी", "Hindi")}</span>
                      <Switch 
                        checked={!isHindi} 
                        onCheckedChange={() => setIsHindi(!isHindi)} 
                      />
                      <span>{getLanguageText("अंग्रेज़ी", "English")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">{getLanguageText("कविता की डिफॉल्ट भाषा", "Default Poem Language")}</label>
                  <select className="w-full rounded-md border border-input bg-transparent px-3 py-2">
                    <option value="hindi">{getLanguageText("हिंदी", "Hindi")}</option>
                    <option value="english">{getLanguageText("अंग्रेज़ी", "English")}</option>
                    <option value="urdu">{getLanguageText("उर्दू", "Urdu")}</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{getLanguageText("नोटिफिकेशन सेटिंग्स", "Notification Settings")}</CardTitle>
                <CardDescription>{getLanguageText("अपने नोटिफिकेशन प्रेफरेंस मैनेज करें", "Manage your notification preferences")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{getLanguageText("लाइक नोटिफिकेशन", "Like Notifications")}</p>
                    <p className="text-sm text-muted-foreground">
                      {getLanguageText("जब कोई आपकी कविता को लाइक करे", "When someone likes your poem")}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{getLanguageText("कमेंट नोटिफिकेशन", "Comment Notifications")}</p>
                    <p className="text-sm text-muted-foreground">
                      {getLanguageText("जब कोई आपकी कविता पर कमेंट करे", "When someone comments on your poem")}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{getLanguageText("सब्सक्रिप्शन अपडेट", "Subscription Updates")}</p>
                    <p className="text-sm text-muted-foreground">
                      {getLanguageText("जब कोई आपको सब्सक्राइब करे", "When someone subscribes to you")}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
