
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Famous poets data
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

type PoetSearchProps = {
  isHindi: boolean;
  getLanguageText: (hindiText: string, englishText: string) => string;
};

const PoetSearch: React.FC<PoetSearchProps> = ({ isHindi, getLanguageText }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(famousPoets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

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
  
  const handlePoetClick = (poetId: string) => {
    navigate(`/poet/${poetId}`);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-sm py-2 px-4 flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>{getLanguageText("लेखक खोजें", "Search Authors")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getLanguageText("लेखक खोजें", "Search Authors")}</DialogTitle>
          <DialogDescription>
            {getLanguageText("प्रसिद्ध कवियों के नाम से खोजें", "Search by the names of famous poets")}
          </DialogDescription>
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handlePoetClick(poet.id)}
                  >
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
  );
};

export default PoetSearch;
