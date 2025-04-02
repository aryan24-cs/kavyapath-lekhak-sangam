
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  BarChart,
  HeartIcon,
  PenLine,
  Settings,
  UserIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PoemCard from "@/components/PoemCard";
import { poems } from "@/data/poems";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [language, setLanguage] = useState<"hindi" | "english">("hindi");
  
  const userPoems = poems.slice(0, 2); // Just use a couple of poems as examples
  
  const toggleLanguage = () => {
    setLanguage(language === "hindi" ? "english" : "hindi");
  };

  const stats = [
    { label: "कुल कविताएँ", value: 8, icon: <PenLine className="h-5 w-5 text-kavya-purple" /> },
    { label: "कुल लाइक्स", value: 124, icon: <HeartIcon className="h-5 w-5 text-pink-500" /> },
    { label: "अनुयायी", value: 36, icon: <UserIcon className="h-5 w-5 text-kavya-lavender" /> },
  ];

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between mb-8 items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-kavya-darkblue dark:text-kavya-lightpink">
              {language === "hindi" ? "आपका डैशबोर्ड" : "Your Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              {language === "hindi" 
                ? "अपनी कविताओं को प्रबंधित करें और अपने खाते की जानकारी देखें" 
                : "Manage your poems and view your account information"}
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-card p-2 rounded-lg border border-border">
            <Label htmlFor="language-toggle">
              {language === "hindi" ? "अंग्रेजी में देखें" : "View in Hindi"}
            </Label>
            <Switch 
              id="language-toggle" 
              checked={language === "english"}
              onCheckedChange={toggleLanguage}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-kavya-pink/20 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "hindi" ? stat.label : stat.label === "कुल कविताएँ" ? "Total Poems" : 
                    stat.label === "कुल लाइक्स" ? "Total Likes" : "Followers"}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-kavya-darkblue dark:text-kavya-lightpink">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="my-poems" className="mb-8">
          <TabsList className="bg-muted mb-6">
            <TabsTrigger value="my-poems" className="data-[state=active]:bg-kavya-purple data-[state=active]:text-white">
              {language === "hindi" ? "मेरी कविताएँ" : "My Poems"}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-kavya-purple data-[state=active]:text-white">
              {language === "hindi" ? "एनालिटिक्स" : "Analytics"}
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-kavya-purple data-[state=active]:text-white">
              {language === "hindi" ? "प्रोफाइल" : "Profile"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-poems" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-kavya-darkblue dark:text-kavya-lightpink">
                {language === "hindi" ? "मेरी कविताएँ" : "My Poems"}
              </h2>
              <Button className="bg-kavya-purple hover:bg-kavya-lavender text-white">
                <PenLine className="mr-2 h-4 w-4" />
                {language === "hindi" ? "नई कविता लिखें" : "Write New Poem"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {userPoems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="text-kavya-darkblue dark:text-kavya-lightpink">
                  {language === "hindi" ? "आपकी कविताओं का प्रदर्शन" : "Your Poems Performance"}
                </CardTitle>
                <CardDescription>
                  {language === "hindi" 
                    ? "पिछले 30 दिनों में आपकी कविताओं का प्रदर्शन" 
                    : "Your poems' performance in the last 30 days"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-60">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <BarChart className="h-16 w-16 mb-4 text-kavya-purple opacity-50" />
                  <p>
                    {language === "hindi" 
                      ? "एनालिटिक्स विवरण यहां दिखाई देगा" 
                      : "Analytics details will be shown here"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-kavya-darkblue dark:text-kavya-lightpink">
                  {language === "hindi" ? "प्रोफाइल सेटिंग्स" : "Profile Settings"}
                </CardTitle>
                <CardDescription>
                  {language === "hindi" 
                    ? "अपनी प्रोफाइल की जानकारी और सेटिंग्स अपडेट करें" 
                    : "Update your profile information and settings"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-kavya-purple/20 flex items-center justify-center overflow-hidden">
                      <UserIcon className="h-14 w-14 text-kavya-purple" />
                    </div>
                    <Button variant="outline" size="sm" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                      <PenLine className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-kavya-darkblue dark:text-kavya-lightpink">
                      {language === "hindi" ? "रवि शर्मा" : "Ravi Sharma"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      user@example.com
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        {language === "hindi" ? "नाम" : "Name"}
                      </Label>
                      <Input id="name" defaultValue={language === "hindi" ? "रवि शर्मा" : "Ravi Sharma"} />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        {language === "hindi" ? "ईमेल" : "Email"}
                      </Label>
                      <Input id="email" defaultValue="user@example.com" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">
                      {language === "hindi" ? "बायो" : "Bio"}
                    </Label>
                    <textarea 
                      id="bio" 
                      rows={3} 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue={language === "hindi" ? "एक उत्साही कवि जो प्रकृति और जीवन के अनुभवों से प्रेरित है।" : "An enthusiastic poet inspired by nature and life experiences."}
                    />
                  </div>
                  
                  <Button className="bg-kavya-purple hover:bg-kavya-lavender text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    {language === "hindi" ? "प्रोफाइल अपडेट करें" : "Update Profile"}
                  </Button>
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
