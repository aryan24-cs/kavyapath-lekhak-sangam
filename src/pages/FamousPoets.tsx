
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

type FamousPoet = {
  id: string;
  name: string;
  lifespan: string;
  bio: string;
  image: string;
  famousWorks: {
    title: string;
    excerpt: string;
  }[];
};

const famousPoets: FamousPoet[] = [
  {
    id: "1",
    name: "सूर्यकांत त्रिपाठी 'निराला'",
    lifespan: "1896-1961",
    bio: "छायावादी युग के चार प्रमुख स्तंभों में से एक, निराला जी ने हिंदी साहित्य को नई दिशा दी और मुक्त छंद को लोकप्रिय बनाया।",
    image: "https://i.pravatar.cc/150?img=51",
    famousWorks: [
      {
        title: "जूही की कली",
        excerpt: "तोड़ती पत्थर\nदेखा उसे मैंने इलाहाबाद के पथ पर\nवह तोड़ती पत्थर।"
      },
      {
        title: "राम की शक्ति पूजा",
        excerpt: "दिगंबरा, धीरा, मंदगति, स्फीता\nगंभीरांचल वाले, सुदूर के\nप्रभंजन के झोंके से विकंपिता।"
      }
    ]
  },
  {
    id: "2",
    name: "हरिवंश राय बच्चन",
    lifespan: "1907-2003",
    bio: "बच्चन जी ने अपनी कविताओं में आम आदमी के जीवन संघर्ष और प्रेम को प्रमुखता से दर्शाया है। 'मधुशाला' उनकी सबसे प्रसिद्ध रचना है।",
    image: "https://i.pravatar.cc/150?img=67",
    famousWorks: [
      {
        title: "मधुशाला",
        excerpt: "मदिरालय जाने को घर से चलता है पीनेवाला,\n'किस पथ से जाऊँ?' असमंजस में है वह भोलाभाला।"
      },
      {
        title: "क्या भूलूँ क्या याद करूँ",
        excerpt: "नभ के उस पार सलोना देश है मेरा,\nरत्नों से खचित सिंहासन वेश है मेरा।"
      }
    ]
  },
  {
    id: "3",
    name: "महादेवी वर्मा",
    lifespan: "1907-1987",
    bio: "महादेवी वर्मा छायावादी युग की प्रमुख कवयित्री थीं। उन्हें 'आधुनिक मीरा' भी कहा जाता है। उनकी कविताओं में करुणा और वेदना का भाव मुखर रहा है।",
    image: "https://i.pravatar.cc/150?img=32",
    famousWorks: [
      {
        title: "नीरजा",
        excerpt: "बीन भी हूँ मैं तुम्हारी रागिनी भी हूँ,\nतुम सजल नयन मेरे उर में बस जाओ।"
      },
      {
        title: "यामा",
        excerpt: "मैं नीर भरी दुख की बदली\nविस्तृत नभ का कोई कोना\nमेरा न कभी अपना होना।"
      }
    ]
  },
  {
    id: "4",
    name: "रामधारी सिंह दिनकर",
    lifespan: "1908-1974",
    bio: "दिनकर जी को 'राष्ट्रकवि' की उपाधि से सम्मानित किया गया था। उनकी कविताओं में राष्ट्रीय चेतना और वीर रस की प्रधानता रही है।",
    image: "https://i.pravatar.cc/150?img=59",
    famousWorks: [
      {
        title: "कुरुक्षेत्र",
        excerpt: "जो पड़ गए भूमि पर अकाल ही,\nउन्हें नमन करके प्रथम विचारना,\nकिस पर करें करुणा, किसे दें दंड हम?"
      },
      {
        title: "उर्वशी",
        excerpt: "अग्निशिखा-सी चमकी थी तुम\nमेरे शोकाकुल अँधियारे में,\nमैं चढ़ा तुम्हारे निर्झर पर\nअतरल उफनी मधुमय प्यारे में।"
      }
    ]
  },
  {
    id: "5",
    name: "मीराबाई",
    lifespan: "1498-1546",
    bio: "मीराबाई कृष्णभक्ति शाखा की प्रमुख कवयित्री थीं। उनके पदों में कृष्ण के प्रति अगाध प्रेम और समर्पण का भाव है।",
    image: "https://i.pravatar.cc/150?img=44",
    famousWorks: [
      {
        title: "मीरा पदावली",
        excerpt: "पग घुँघरू बांध मीरा नाची रे,\nमैं तो अपने नारायण की आपही हो गई दासी रे।"
      },
      {
        title: "गिरधर गोपाल",
        excerpt: "मेरे तो गिरधर गोपाल, दूसरो न कोई\nजाके सिर मोर मुकुट, मेरो पति सोई।"
      }
    ]
  }
];

const FamousPoets = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-kavya-darkblue dark:text-kavya-lightpink">
              भारत के महान कवि
            </h1>
            <p className="text-muted-foreground">
              हिंदी साहित्य के प्रसिद्ध कवियों की जीवनी और उनकी प्रमुख रचनाएँ
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>होम पेज</span>
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {famousPoets.map((poet) => (
            <Card key={poet.id} className="overflow-hidden animate-fade-in">
              <CardHeader>
                <div className="flex gap-4">
                  <img
                    src={poet.image}
                    alt={poet.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-kavya-purple"
                  />
                  <div>
                    <CardTitle className="text-xl">{poet.name}</CardTitle>
                    <CardDescription>{poet.lifespan}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{poet.bio}</p>
                
                <div className="space-y-4 mt-4">
                  <h3 className="font-semibold text-lg text-kavya-purple">प्रमुख रचनाएँ</h3>
                  {poet.famousWorks.map((work, index) => (
                    <div key={index} className="bg-muted p-4 rounded-md shadow-sm">
                      <h4 className="font-medium mb-2 text-kavya-darkblue dark:text-kavya-lightpink">
                        {work.title}
                      </h4>
                      <p className="whitespace-pre-line text-foreground">{work.excerpt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-kavya-pink" />
                    <span>पसंद करें</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>शेयर करें</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>और जानें</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default FamousPoets;
