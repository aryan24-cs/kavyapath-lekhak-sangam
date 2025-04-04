
import React, { useState } from "react";
import { PenLine, BookOpen, User, LogIn, Users, LayoutDashboard, Search, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { categories } from "@/data/categories";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Multiple famous poets with search functionality
const famousPoets = [
  { id: "poet1", name: "कबीरदास", nameEn: "Kabirdas" },
  { id: "poet2", name: "तुलसीदास", nameEn: "Tulsidas" },
  { id: "poet3", name: "सूरदास", nameEn: "Surdas" },
  { id: "poet4", name: "मीराबाई", nameEn: "Mirabai" },
  { id: "poet5", name: "रहीम", nameEn: "Rahim" },
  { id: "poet6", name: "भारतेंदु हरिश्चंद्र", nameEn: "Bharatendu Harishchandra" },
  { id: "poet7", name: "मैथिलीशरण गुप्त", nameEn: "Maithilisharan Gupt" },
  { id: "poet8", name: "जयशंकर प्रसाद", nameEn: "Jaishankar Prasad" },
  { id: "poet9", name: "सुमित्रानंदन पंत", nameEn: "Sumitranandan Pant" },
  { id: "poet10", name: "महादेवी वर्मा", nameEn: "Mahadevi Verma" },
  { id: "poet11", name: "रामधारी सिंह दिनकर", nameEn: "Ramdhari Singh Dinkar" },
  { id: "poet12", name: "हरिवंश राय बच्चन", nameEn: "Harivansh Rai Bachchan" },
  { id: "poet13", name: "अमृता प्रीतम", nameEn: "Amrita Pritam" },
  { id: "poet14", name: "भवानी प्रसाद मिश्र", nameEn: "Bhawani Prasad Mishra" },
  { id: "poet15", name: "केदारनाथ अग्रवाल", nameEn: "Kedarnath Agarwal" }
];

const Navbar = () => {
  const [isHindi, setIsHindi] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(famousPoets);

  const toggleLanguage = () => {
    setIsHindi(!isHindi);
  };

  const getLanguageText = (hindiText: string, englishText: string) => {
    return isHindi ? hindiText : englishText;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setSearchResults(famousPoets);
      return;
    }
    
    const results = famousPoets.filter(
      (poet) => 
        poet.name.toLowerCase().includes(query) || 
        poet.nameEn.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  };

  return (
    <header className="border-b border-border">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-kavya-pink" />
            <h1 className="text-xl font-bold">
              <span className="text-kavya-pink">काव्य</span>
              <span>पथ</span>
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">
            {getLanguageText("होम", "Home")}
          </Link>
          <div className="relative group">
            <Link to="/categories" className="nav-link flex items-center gap-1">
              {getLanguageText("श्रेणियाँ", "Categories")}
            </Link>
            <div className="absolute z-10 left-0 mt-2 w-48 hidden group-hover:block bg-card border border-border rounded-md shadow-lg p-2">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/categories#${category.id}`}
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                >
                  {isHindi ? category.name : category.nameEn}
                </a>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button className="nav-link flex items-center gap-1">
              {getLanguageText("लेखक", "Authors")}
            </button>
            <div className="absolute z-10 left-0 mt-2 w-48 hidden group-hover:block bg-card border border-border rounded-md shadow-lg p-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start text-sm py-2 px-4 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span>{getLanguageText("लेखक खोजें", "Search Authors")}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{getLanguageText("लेखक खोजें", "Search Authors")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input
                      placeholder={getLanguageText("लेखक का नाम दर्ज करें...", "Enter author name...")}
                      value={searchQuery}
                      onChange={handleSearch}
                      className="mb-4"
                    />
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {searchResults.length > 0 ? (
                        searchResults.map((poet) => (
                          <div
                            key={poet.id}
                            className="p-2 hover:bg-accent rounded flex items-center justify-between cursor-pointer"
                          >
                            <span>{isHindi ? poet.name : poet.nameEn}</span>
                            <Button variant="ghost" size="sm">
                              {getLanguageText("देखें", "View")}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">
                          {getLanguageText("कोई परिणाम नहीं मिला", "No results found")}
                        </p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Link
                to="/famous-poets"
                className="block px-4 py-2 text-sm hover:bg-accent rounded-md flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>{getLanguageText("प्रसिद्ध कवि", "Famous Poets")}</span>
              </Link>
            </div>
          </div>
          <Link to="/spiritual-poems" className="nav-link flex items-center gap-1">
            <Music className="w-4 h-4" />
            <span>{getLanguageText("आध्यात्मिक काव्य", "Spiritual Poems")}</span>
          </Link>
          <a href="#" className="nav-link">
            {getLanguageText("नई कविताएँ", "New Poems")}
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">{isHindi ? "हिंदी" : "EN"}</span>
            <Switch 
              checked={!isHindi} 
              onCheckedChange={toggleLanguage} 
              aria-label="Toggle language"
            />
          </div>
          
          <ThemeToggle />
          <Link to="/dashboard">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              title={getLanguageText("डैशबोर्ड", "Dashboard")}
            >
              <LayoutDashboard className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              <span>{getLanguageText("लॉग इन", "Log In")}</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-primary hidden md:flex items-center gap-1">
              <PenLine className="w-4 h-4" />
              <span>{getLanguageText("लिखें", "Write")}</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
