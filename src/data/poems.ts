
import { categories } from "./categories";

export type Poem = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  categoryId: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export const poems: Poem[] = [
  {
    id: "1",
    title: "सागर और किनारे",
    content: `लहरें उठती हैं, गिरती हैं,
किनारे को छूती हैं, बिखरती हैं।
सागर की गहराई में छिपा है राज़,
जो हर किनारे को समझना है।

हम भी हैं किनारे, तुम भी हो किनारे,
बीच में है सागर, दोनों के बीच का फ़ासला।
लहरें आती हैं, प्यार लेकर,
वापस जाती हैं, यादें देकर।`,
    author: {
      id: "user1",
      name: "अनुपम मिश्रा",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    categoryId: "prem",
    likes: 124,
    comments: 18,
    createdAt: "2023-11-12T10:30:00Z"
  },
  {
    id: "2",
    title: "विरह का दर्द",
    content: `बिछड़ने की पीड़ा है अनकही,
शब्दों में कैसे बयां करूँ।
हर पल तुम्हारी याद आती है,
हर सांस में तुम्हारा नाम है।

दूरियां हैं मगर दिल पास हैं,
टूटे हुए ख्वाब, बिखरे अहसास हैं।
आओगे तुम फिर एक दिन,
यही उम्मीद, यही विश्वास है।`,
    author: {
      id: "user2",
      name: "दीपिका शर्मा",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    categoryId: "virah",
    likes: 89,
    comments: 12,
    createdAt: "2023-10-25T15:45:00Z"
  },
  {
    id: "3",
    title: "वतन के नाम",
    content: `मिट्टी तेरी, हवा तेरी,
सब कुछ तेरा, ये जां भी तेरी।
तिरंगे की शान में,
सर कटाने से भी न डरें हम।

माँ तुझे सलाम है,
तेरे चरणों में प्रणाम है।
जान है कुर्बान तुझपे,
ये हर हिंदुस्तानी का पैगाम है।`,
    author: {
      id: "user3",
      name: "विकास त्रिपाठी",
      avatar: "https://i.pravatar.cc/150?img=61"
    },
    categoryId: "deshbhakti",
    likes: 215,
    comments: 37,
    createdAt: "2023-08-15T08:15:00Z"
  },
  {
    id: "4",
    title: "बरसात की रात",
    content: `बादल गरजते, बिजली चमकती,
पत्तों पर बूंदें, धरती महकती।
आम की डाली, नीम की छांव,
मोर नाचते, कोयल गाती।

हरियाली चारों ओर फैली,
प्रकृति की सुंदरता निराली।
बारिश की फुहारें, ठंडी हवाएं,
पावन है ये धरती माता प्यारी।`,
    author: {
      id: "user4",
      name: "मीरा गुप्ता",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    categoryId: "prakriti",
    likes: 78,
    comments: 9,
    createdAt: "2023-07-05T18:20:00Z"
  },
  {
    id: "5",
    title: "आत्मा का प्रकाश",
    content: `अंधेरे में डूबी दुनिया,
एक दीप जलाओ।
मन के भीतर छिपे प्रकाश को,
बाहर लाओ।

परमात्मा है हर कण में,
पहचानो उसकी शक्ति को।
आत्मज्ञान से मिलेगी मुक्ति,
समझो इस सत्य को।`,
    author: {
      id: "user5",
      name: "आदित्य योगी",
      avatar: "https://i.pravatar.cc/150?img=69"
    },
    categoryId: "adhyatm",
    likes: 152,
    comments: 28,
    createdAt: "2023-09-18T12:10:00Z"
  }
];

export const getCategory = (categoryId: string) => {
  return categories.find(cat => cat.id === categoryId);
};
