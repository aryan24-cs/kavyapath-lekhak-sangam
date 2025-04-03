import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { Bell, BookOpen, Edit, Heart, MessageCircle, PenLine, Plus, Save, Settings, Share2, Upload, User } from "lucide-react";
import { poems } from "@/data/poems";
import PenAnimation from "@/components/PenAnimation";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // User profile state
  const [name, setName] = useState("राजेश शर्मा");
  const [bio, setBio] = useState("मैं एक कवि हूँ जो हिंदी और उर्दू में लिखता है। मुझे प्रकृति और प्रेम पर कविताएँ लिखना पसंद है।");
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  // New poem state
  const [newPoemTitle, setNewPoemTitle] = useState("");
  const [newPoemContent, setNewPoemContent] = useState("");
  const [newPoemCategory, setNewPoemCategory] = useState("prem");
  
  // Saved poems (just using sample data for now)
  const savedPoems = poems.slice(0, 2);
  
  // User's own poems
  const userPoems = [
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
  
  const handleSaveProfile = () => {
    setEditing(false);
    toast({
      title: "प्रोफ़ाइल अपडेट हो गई",
      description: "आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट कर दी गई है।",
    });
  };
  
  const handlePublishPoem = () => {
    if (!newPoemTitle || !newPoemContent) {
      toast({
        title: "कृपया सभी फील्ड भरें",
        description: "कविता का शीर्षक और सामग्री आवश्यक हैं।",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "कविता प्रकाशित हुई!",
      description: "आपकी कविता सफलतापूर्वक प्रकाशित हो गई है।",
    });
    
    setNewPoemTitle("");
    setNewPoemContent("");
    setActiveTab("my-poems");
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target) {
          setAvatar(event.target.result as string);
          toast({
            title: "प्रोफाइल फोटो अपडेट हुई",
            description: "आपकी प्रोफाइल फोटो सफलतापूर्वक अपलोड हो गई है।",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-5 w-auto">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">प्रोफ़ाइल</span>
              </TabsTrigger>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <PenLine size={16} />
                <span className="hidden sm:inline">लिखें</span>
              </TabsTrigger>
              <TabsTrigger value="my-poems" className="flex items-center gap-2">
                <BookOpen size={16} />
                <span className="hidden sm:inline">मेरी कविताएँ</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Save size={16} />
                <span className="hidden sm:inline">सेव की गई</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                <span className="hidden sm:inline">सेटिंग्स</span>
              </TabsTrigger>
            </TabsList>
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              वापस होम पेज पर
            </Button>
          </div>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="relative">
                <div className="absolute right-6 top-6">
                  {editing ? (
                    <Button onClick={handleSaveProfile} variant="default" size="sm">
                      सेव करें
                    </Button>
                  ) : (
                    <Button onClick={() => setEditing(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      एडिट करें
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
                <h3 className="text-lg font-semibold mb-3">आँकड़े</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">कुल कविताएँ</p>
                    <p className="text-2xl font-bold text-kavya-pink">8</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">कुल लाइक्स</p>
                    <p className="text-2xl font-bold text-kavya-purple">256</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">कुल कमेंट्स</p>
                    <p className="text-2xl font-bold text-kavya-lavender">42</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">सब्सक्राइबर्स</p>
                    <p className="text-2xl font-bold text-green-500">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>सब्सक्राइब्ड कवि</CardTitle>
                <CardDescription>आप इन कवियों को फॉलो करते हैं</CardDescription>
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
                        <p className="text-sm text-muted-foreground">42 कविताएँ</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">अनसब्सक्राइब</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-kavya-pink/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-kavya-pink" />
                      </div>
                      <div>
                        <p className="font-medium">दीपिका शर्मा</p>
                        <p className="text-sm text-muted-foreground">23 कविताएँ</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">अनसब्सक्राइब</Button>
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
                  नई कविता लिखें
                </CardTitle>
                <CardDescription>अपनी भावनाओं को शब्दों में उतारें और दुनिया के साथ साझा करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <PenAnimation />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">शीर्षक</label>
                    <Input 
                      placeholder="अपनी कविता का शीर्षक लिखें"
                      value={newPoemTitle}
                      onChange={(e) => setNewPoemTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">श्रेणी</label>
                    <select 
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                      value={newPoemCategory}
                      onChange={(e) => setNewPoemCategory(e.target.value)}
                    >
                      <option value="prem">प्रेम</option>
                      <option value="prakriti">प्रकृति</option>
                      <option value="deshbhakti">देशभक्ति</option>
                      <option value="adhyatm">अध्यात्म</option>
                      <option value="virah">विरह</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">कविता</label>
                    <Textarea 
                      placeholder="अपनी कविता यहाँ लिखें..."
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
                  रीसेट
                </Button>
                <Button onClick={handlePublishPoem}>प्रकाशित करें</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* My Poems Tab */}
          <TabsContent value="my-poems" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">मेरी कविताएँ</h2>
              <Button onClick={() => setActiveTab("write")} size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                नई कविता
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {userPoems.map((poem) => (
                <Card key={poem.id}>
                  <CardHeader>
                    <CardTitle>{poem.title}</CardTitle>
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
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Saved Poems Tab */}
          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-xl font-bold">सेव की गई कविताएँ</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {savedPoems.map((poem) => (
                <Card key={poem.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{poem.title}</CardTitle>
                        <CardDescription>
                          कवि: {poem.author.name}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Save className="h-4 w-4 fill-current" />
                      </Button>
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
              ))}
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>भाषा सेटिंग्स</CardTitle>
                <CardDescription>अपनी पसंदीदा भाषा चुनें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">इंटरफेस भाषा</label>
                  <select className="w-full rounded-md border border-input bg-transparent px-3 py-2">
                    <option value="hindi">हिंदी</option>
                    <option value="english">English</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">कविता की डिफॉल्ट भाषा</label>
                  <select className="w-full rounded-md border border-input bg-transparent px-3 py-2">
                    <option value="hindi">हिंदी</option>
                    <option value="english">English</option>
                    <option value="urdu">उर्दू</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>नोटिफिकेशन सेटिंग्स</CardTitle>
                <CardDescription>अपने नोटिफिकेशन प्रेफरेंस मैनेज करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">लाइक नोटिफिकेशन</p>
                    <p className="text-sm text-muted-foreground">जब कोई आपकी कविता को लाइक करे</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">कमेंट नोटिफिकेशन</p>
                    <p className="text-sm text-muted-foreground">जब कोई आपकी कविता पर कमेंट करे</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">सब्सक्रिप्शन अपडेट</p>
                    <p className="text-sm text-muted-foreground">जब कोई आपको सब्सक्राइब करे</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
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
