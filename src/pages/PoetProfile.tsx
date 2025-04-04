
import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, BookmarkPlus, MessageCircle, Share2, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import the data for all poets from Navbar.tsx
const famousPoets = [
  { id: "poet1", name: "कबीरदास", nameEn: "Kabirdas", avatar: "https://i.pravatar.cc/150?img=52", 
    bio: "कबीर भारतीय इतिहास के महानतम संत कवियों में से एक थे। उन्होंने अपनी दोहों के माध्यम से समाज में व्याप्त बुराइयों और आडंबरों का विरोध किया।",
    lifespan: "1398-1518",
    birthPlace: "काशी (वाराणसी)",
    majorWorks: ["बीजक", "साखी", "सबद", "रमैनी"],
    poems: [
      {
        id: "kabir-1",
        title: "साखी",
        content: "बड़ा हुआ तो क्या हुआ, जैसे पेड़ खजूर।\nपंथी को छाया नहीं, फल लागे अति दूर॥",
        category: "adhyatm",
        likes: 234,
        meaning: "इस दोहे में कबीर कहते हैं कि केवल बड़ा (प्रसिद्ध, धनवान, शक्तिशाली) होना पर्याप्त नहीं है अगर आप दूसरों की सहायता नहीं करते। जैसे खजूर का पेड़ बहुत ऊंचा होता है लेकिन राहगीरों को छाया नहीं देता और उसके फल इतनी ऊंचाई पर होते हैं कि आम लोगों की पहुंच से दूर होते हैं।"
      },
      {
        id: "kabir-2",
        title: "निर्गुण भजन",
        content: "माला फेरत जुग भया, फिरा न मन का फेर।\nकर का मनका डारि दे, मन का मनका फेर॥",
        category: "adhyatm",
        likes: 189,
        meaning: "इस दोहे में कबीर बाहरी आडंबरों का विरोध करते हैं। वे कहते हैं कि लोगों ने माला फेरते-फेरते युग बीता दिया है, लेकिन मन के फेर (विकार) नहीं फिरे। इसलिए हाथ की माला छोड़कर मन की माला फेरने की सलाह देते हैं - यानी बाह्य धार्मिकता छोड़कर आंतरिक आध्यात्मिकता पर ध्यान देने को कहते हैं।"
      },
      {
        id: "kabir-3",
        title: "साधु और संत",
        content: "साधु ऐसा चाहिए, जैसा सूप सुभाय।\nसार-सार को गहि रहे, थोथा देई उड़ाय॥",
        category: "adhyatm",
        likes: 156,
        meaning: "कबीर कहते हैं कि एक साधु (धार्मिक व्यक्ति) को सूप की तरह होना चाहिए जो अनाज और भूसे को अलग करता है। सच्चे साधु को सार (सत्य, अच्छाई) को ग्रहण करना चाहिए और थोथा (झूठ, बुराई) को त्याग देना चाहिए।"
      }
    ]
  },
  { id: "poet2", name: "तुलसीदास", nameEn: "Tulsidas", avatar: "https://i.pravatar.cc/150?img=53", 
    bio: "गोस्वामी तुलसीदास हिंदी साहित्य के सर्वश्रेष्ठ कवियों में से एक थे। उनकी रचना 'रामचरितमानस' हिंदी साहित्य का अमूल्य रत्न है।",
    lifespan: "1532-1623",
    birthPlace: "राजापुर, उत्तर प्रदेश",
    majorWorks: ["रामचरितमानस", "विनय पत्रिका", "दोहावली", "कवितावली"],
    poems: [
      {
        id: "tulsi-1",
        title: "रामचरितमानस - सुंदरकांड",
        content: "जासु नाम जपि सुनहु भवानी। बाल्मीकि भए ब्रह्म समानी॥\nनारद जाना जासु प्रभावा। जासु कृपा सब सिधि उपजावा॥",
        category: "adhyatm",
        likes: 245,
        meaning: "तुलसीदास कहते हैं कि हे भवानी! सुनिए, जिस राम के नाम का जाप करके वाल्मीकि ब्रह्मज्ञानी हो गए। नारद जी ने जिनका प्रभाव जाना और जिनकी कृपा से सभी सिद्धियां प्राप्त होती हैं।"
      },
      {
        id: "tulsi-2",
        title: "विनय पत्रिका",
        content: "कहत नटत रीझत खिझत, मिलत खिलत लजिआत।\nभरे भाव में करत हैं, नैनन ही सों बात॥",
        category: "prem",
        likes: 178,
        meaning: "इस पद में तुलसीदास प्रेम की अभिव्यक्ति के बारे में कहते हैं। वे कहते हैं कि प्रेमी कभी बात करते हैं, कभी नाचते हैं, कभी प्रसन्न होते हैं, कभी क्रोधित होते हैं, कभी मिलते हैं, कभी खिलते हैं और कभी लज्जित होते हैं। भावों से भरे हुए प्रेमी आंखों से ही बातें करते हैं।"
      },
      {
        id: "tulsi-3",
        title: "दोहावली",
        content: "दया धर्म का मूल है, पाप मूल अभिमान।\nतुलसी दया न छांड़िये, जब लग घट में प्रान॥",
        category: "adhyatm",
        likes: 203,
        meaning: "तुलसीदास कहते हैं कि दया धर्म का मूल है और अभिमान पाप का मूल है। वे सलाह देते हैं कि जब तक शरीर में प्राण हैं, तब तक दया को नहीं छोड़ना चाहिए।"
      }
    ]
  },
  { id: "poet3", name: "सूरदास", nameEn: "Surdas", avatar: "https://i.pravatar.cc/150?img=54", 
    bio: "सूरदास कृष्ण भक्ति शाखा के प्रमुख कवि थे। उनकी 'सूरसागर' में कृष्ण के बाल रूप का अद्भुत वर्णन मिलता है।",
    lifespan: "1478-1583",
    birthPlace: "रुनकता, मथुरा",
    majorWorks: ["सूरसागर", "साहित्य लहरी", "सूर सारावली", "भ्रमरगीत"],
    poems: [
      {
        id: "surdas-1",
        title: "मैया मोरी मैं नहीं माखन खायो",
        content: "मैया मोरी मैं नहीं माखन खायो।\nख्याल परै बकि देत मोसों, ब्याज उठायो॥",
        category: "prem",
        likes: 267,
        meaning: "इस पद में बाल कृष्ण अपनी माँ यशोदा से कहते हैं कि उन्होंने मक्खन नहीं खाया है। वे कहते हैं कि उन पर झूठा आरोप लगाया जा रहा है।"
      },
      {
        id: "surdas-2",
        title: "भ्रमरगीत",
        content: "उधौ! मन न भए दस-बीस।\nएक हुतौ सौ गयौ श्याम संग, कौ अवराधै ईस॥",
        category: "virah",
        likes: 194,
        meaning: "गोपियां उद्धव से कहती हैं कि हमारा मन दस-बीस (अनेक) नहीं होता। हमारा एक ही मन था जो श्याम (कृष्ण) के साथ चला गया। अब कौन ईश्वर की आराधना करेगा?"
      },
      {
        id: "surdas-3",
        title: "गोपियों का विरह",
        content: "अब कैसे छूटै राम रत लागी।\nप्रभु जी, तुम चंदन हम पानी, तुम मिलि भइ सोहागी॥",
        category: "virah",
        likes: 182,
        meaning: "गोपियां कहती हैं कि अब कृष्ण के प्रति हमारा प्रेम कैसे छूटे? हे प्रभु, आप चंदन हैं और हम पानी हैं। आपके मिलने से हम सौभाग्यशाली हो गए हैं (जैसे पानी चंदन से मिलकर सुगंधित हो जाता है)।"
      }
    ]
  },
  { id: "poet4", name: "मीराबाई", nameEn: "Mirabai", avatar: "https://i.pravatar.cc/150?img=44", 
    bio: "मीराबाई कृष्णभक्ति शाखा की प्रमुख कवयित्री थीं। उनके पदों में कृष्ण के प्रति अगाध प्रेम और समर्पण का भाव है।",
    lifespan: "1498-1546",
    birthPlace: "कुडकी, राजस्थान",
    majorWorks: ["पदावली", "राग गोविंद", "नरसी जी का मायरा", "गीत गोविंद टीका"],
    poems: [
      {
        id: "meera-1",
        title: "मीरा पदावली",
        content: "पग घुँघरू बांध मीरा नाची रे,\nमैं तो अपने नारायण की आपही हो गई दासी रे।",
        category: "adhyatm",
        likes: 278,
        meaning: "मीरा कहती हैं कि वह पैरों में घुंघरू बांधकर अपने नारायण (कृष्ण) के लिए नाचती है। वह स्वयं को कृष्ण की दासी (सेविका) मानती है।"
      },
      {
        id: "meera-2",
        title: "मेरे तो गिरधर गोपाल",
        content: "मेरे तो गिरधर गोपाल, दूसरो न कोई\nजाके सिर मोर मुकुट, मेरो पति सोई।",
        category: "prem",
        likes: 253,
        meaning: "मीरा कहती हैं कि उनके लिए केवल गिरधर गोपाल (कृष्ण) ही सब कुछ हैं, दूसरा कोई नहीं। जिनके सिर पर मोर के पंखों का मुकुट है, वही उनके पति हैं।"
      },
      {
        id: "meera-3",
        title: "रैन गँवाई सोय के",
        content: "रैन गँवाई सोय के, दिवस गँवायो खाय।\nहीरा जन्म अमोल था, कौड़ी बदले जाय॥",
        category: "adhyatm",
        likes: 197,
        meaning: "मीरा कहती हैं कि लोग रात को सोकर और दिन को खाकर गंवा देते हैं। इस अमूल्य मानव जन्म रूपी हीरे को कौड़ी के बदले गंवा देते हैं (यानी बिना आध्यात्मिक साधना के व्यर्थ गंवा देते हैं)।"
      }
    ]
  },
  { id: "poet5", name: "रहीम", nameEn: "Rahim", avatar: "https://i.pravatar.cc/150?img=55", 
    bio: "अब्दुल रहीम खानखाना (रहीम) अकबर के नवरत्नों में से एक थे। उनके दोहों में नीति, विनय और श्रृंगार का अद्भुत संगम मिलता है।",
    lifespan: "1556-1627",
    birthPlace: "लाहौर (अब पाकिस्तान)",
    majorWorks: ["रहिमन दोहावली", "मदनाष्टक", "श्रृंगार सोरठा", "रसपंचाध्यायी"],
    poems: [
      {
        id: "rahim-1",
        title: "नीति दोहे",
        content: "रहिमन धागा प्रेम का, मत तोड़ो चटकाय।\nटूटे से फिर ना मिले, मिले गाँठ परि जाय॥",
        category: "prem",
        likes: 223,
        meaning: "रहीम कहते हैं कि प्रेम के धागे को झटके से नहीं तोड़ना चाहिए। यदि वह टूट जाए तो वापस जुड़ सकता है, लेकिन उसमें गांठ (अविश्वास, दरार) पड़ जाती है।"
      },
      {
        id: "rahim-2",
        title: "दया दोहा",
        content: "जो रहीम उत्तम प्रकृति, का करि सकत कुसंग।\nचंदन विष व्यापत नहीं, लिपटे रहत भुजंग॥",
        category: "adhyatm",
        likes: 198,
        meaning: "रहीम कहते हैं कि उत्तम प्रकृति वाले व्यक्ति को बुरी संगति प्रभावित नहीं कर सकती। जैसे चंदन के पेड़ पर सांप लिपटे रहने पर भी चंदन विषैला नहीं होता।"
      },
      {
        id: "rahim-3",
        title: "नीति दोहे",
        content: "रहिमन निज मन की बिथा, मन ही राखो गोय।\nसुनि अठिलैहैं लोग सब, बाँटि न लैंहें कोय॥",
        category: "adhyatm",
        likes: 187,
        meaning: "रहीम कहते हैं कि अपने मन की व्यथा (दुःख) को अपने मन में ही छिपाकर रखना चाहिए। सब लोग इसे सुनकर हंसेंगे, लेकिन कोई इसमें साझेदारी नहीं करेगा (यानी आपका दुःख बांटेगा नहीं)।"
      }
    ]
  },
  { id: "poet6", name: "भारतेंदु हरिश्चंद्र", nameEn: "Bharatendu Harishchandra", avatar: "https://i.pravatar.cc/150?img=56", 
    bio: "भारतेंदु हरिश्चंद्र आधुनिक हिंदी साहित्य के जनक माने जाते हैं। उन्होंने हिंदी साहित्य को नई दिशा दी और देशभक्ति, समाज सुधार और भाषा के विकास के लिए कार्य किया।",
    lifespan: "1850-1885",
    birthPlace: "वाराणसी, उत्तर प्रदेश",
    majorWorks: ["भारत दुर्दशा", "प्रेम माधुरी", "विनय प्रेम पचासा", "सत्य हरिश्चंद्र"],
    poems: [
      {
        id: "bharatendu-1",
        title: "देश प्रेम",
        content: "रोवहु सब मिलि आवहु भारत भाई,\nहा! हा! भारत दुर्दशा न देखी जाई।",
        category: "deshbhakti",
        likes: 213,
        meaning: "भारतेंदु भारत के भाइयों से कहते हैं कि वे सब मिलकर रोएं, क्योंकि भारत की दुर्दशा देखी नहीं जा सकती।"
      },
      {
        id: "bharatendu-2",
        title: "निज भाषा प्रेम",
        content: "निज भाषा उन्नति अहै, सब उन्नति को मूल।\nबिन निज भाषा ज्ञान के, मिटत न हिय को शूल॥",
        category: "deshbhakti",
        likes: 195,
        meaning: "भारतेंदु कहते हैं कि अपनी भाषा की उन्नति ही सभी प्रकार की उन्नति का मूल है। अपनी भाषा में ज्ञान प्राप्त किए बिना हृदय की पीड़ा दूर नहीं होती।"
      },
      {
        id: "bharatendu-3",
        title: "हिंदी की दशा",
        content: "अंग्रेज़ी पढ़ि के जदपि, सब गुन होत प्रवीन।\nपै निज भाषा ज्ञान बिन, रहत हीन के हीन॥",
        category: "deshbhakti",
        likes: 186,
        meaning: "भारतेंदु कहते हैं कि अंग्रेज़ी पढ़कर भले ही सभी गुणों में प्रवीण हो जाए, लेकिन अपनी भाषा के ज्ञान के बिना वह हीन ही रहता है।"
      }
    ]
  },
  { id: "poet7", name: "मैथिलीशरण गुप्त", nameEn: "Maithilisharan Gupt", avatar: "https://i.pravatar.cc/150?img=57", 
    bio: "मैथिलीशरण गुप्त द्विवेदी युग के प्रमुख कवि थे। राष्ट्रीय भावना और सांस्कृतिक चेतना उनकी कविताओं का मुख्य विषय था।",
    lifespan: "1886-1964",
    birthPlace: "झांसी, उत्तर प्रदेश",
    majorWorks: ["साकेत", "यशोधरा", "पंचवटी", "जयद्रथ वध"],
    poems: [
      {
        id: "maithili-1",
        title: "साकेत - नवम् सर्ग",
        content: "अबला जीवन हाय, तुम्हारी यही कहानी।\nआँचल में है दूध और आँखों में पानी॥",
        category: "adhyatm",
        likes: 253,
        meaning: "कवि स्त्री जीवन की व्यथा बयान करते हुए कहता है कि अबला (नारी) जीवन की कहानी यही है कि उसके आँचल में दूध (ममता, वात्सल्य) है और आँखों में पानी (आँसू, दुःख)।"
      },
      {
        id: "maithili-2",
        title: "भारत-भारती",
        content: "हम कौन थे, क्या हो गए हैं, और क्या होंगे अभी।\nआओ विचारें आज मिलकर, ये समस्याएँ सभी॥",
        category: "deshbhakti",
        likes: 218,
        meaning: "कवि देशवासियों को संबोधित करते हुए कहता है कि हम सब मिलकर यह विचार करें कि हम कौन थे, क्या हो गए हैं, और भविष्य में क्या होंगे।"
      },
      {
        id: "maithili-3",
        title: "यशोधरा",
        content: "वह अँधेरी रात एक महा काल की घड़ी थी।\nप्रिय बिना जब घर में मैं एकाकिनी पड़ी थी॥",
        category: "virah",
        likes: 197,
        meaning: "यशोधरा (गौतम बुद्ध की पत्नी) कहती है कि जब गौतम उन्हें छोड़कर चले गए थे, वह अंधेरी रात महाकाल की घड़ी थी, जब वह अपने प्रिय के बिना घर में अकेली पड़ी थीं।"
      }
    ]
  },
  { id: "poet8", name: "जयशंकर प्रसाद", nameEn: "Jaishankar Prasad", avatar: "https://i.pravatar.cc/150?img=58", 
    bio: "जयशंकर प्रसाद छायावादी युग के चार प्रमुख स्तंभों में से एक थे। कामायनी और आंसू उनकी प्रसिद्ध कृतियां हैं।",
    lifespan: "1889-1937",
    birthPlace: "वाराणसी, उत्तर प्रदेश",
    majorWorks: ["कामायनी", "आंसू", "लहर", "झरना"],
    poems: [
      {
        id: "prasad-1",
        title: "कामायनी - श्रद्धा सर्ग",
        content: "आनंद सिंधु में आज उठा दिव्य तरंग,\nदेख रहा चिंमय चंचल नर्तक वैभव अनंग।",
        category: "adhyatm",
        likes: 264,
        meaning: "कवि आनंद के सागर में उठने वाली दिव्य तरंगों का वर्णन करते हुए कहता है कि वह चेतनामय चंचल नर्तक (शिव) के वैभव को देख रहा है।"
      },
      {
        id: "prasad-2",
        title: "आंसू",
        content: "अश्रु मेरे विगत जीवन की स्मृतियाँ हैं,\nप्राण बेलि पर अटके मुरझाये फूल-से,\nमृदु नभ निझर में परिचित हैं स्फीतिमान,\nस्वागत को खड़े तटवर्ती कल्पतरु से।",
        category: "virah",
        likes: 231,
        meaning: "कवि कहता है कि उसके आँसू उसके बीते हुए जीवन की स्मृतियाँ हैं, जो प्राण रूपी बेल पर अटके मुरझाए फूलों जैसे हैं। वे कोमल आकाश रूपी झरने में परिचित हैं और स्वागत के लिए तट पर खड़े कल्पवृक्ष से मिलने जा रहे हैं।"
      },
      {
        id: "prasad-3",
        title: "बीती विभावरी जाग री",
        content: "बीती विभावरी जाग री!\nअम्बर-पनघट में डुबो रही,\nतारा-घट ऊषा-नागरी।",
        category: "prakriti",
        likes: 209,
        meaning: "कवि सुबह होने का वर्णन करते हुए कहता है कि रात बीत गई है और अब जागने का समय है। आकाश रूपी पनघट में तारा रूपी घड़ों को उषा रूपी नागरी डुबो रही है।"
      }
    ]
  },
];

const PoetProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the poet based on the ID
  const poet = famousPoets.find(p => p.id === id);
  
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<
    Array<{id: string; user: string; text: string; timestamp: string}>
  >([
    {
      id: "1",
      user: "रमेश शर्मा",
      text: "इनकी कविताएँ हमेशा मेरे दिल को छू लेती हैं।",
      timestamp: "2 दिन पहले"
    },
    {
      id: "2",
      user: "अनुराधा वर्मा",
      text: "भारतीय साहित्य के महान स्तंभ हैं यह महाकवि।",
      timestamp: "1 सप्ताह पहले"
    }
  ]);
  
  if (!poet) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">कवि नहीं मिला</h1>
          <p className="mb-6">माफ़ कीजिए, आपके द्वारा खोजे गए कवि का विवरण उपलब्ध नहीं है।</p>
          <Link to="/famous-poets">
            <Button>सभी कवि देखें</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const handleLike = (poemTitle: string) => {
    toast({
      title: "कविता पसंद की गई",
      description: `आपने "${poemTitle}" कविता को पसंद किया।`,
    });
  };
  
  const handleSave = (poemTitle: string) => {
    toast({
      title: "कविता सहेजी गई",
      description: `"${poemTitle}" कविता को आपकी सहेजी गई कविताओं में जोड़ा गया।`,
    });
  };
  
  const handleShareTwitter = (poemTitle: string) => {
    toast({
      title: "ट्विटर पर शेयर करें",
      description: `"${poemTitle}" कविता को ट्विटर पर शेयर करें।`,
    });
  };
  
  const handleShareInstagram = (poemTitle: string) => {
    toast({
      title: "इंस्टाग्राम पर शेयर करें",
      description: `"${poemTitle}" कविता को इंस्टाग्राम पर शेयर करें।`,
    });
  };
  
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      user: "वर्तमान उपयोगकर्ता",
      text: comment,
      timestamp: "अभी"
    };
    
    setComments([newComment, ...comments]);
    setComment("");
    
    toast({
      title: "टिप्पणी जोड़ी गई",
      description: "आपकी टिप्पणी सफलतापूर्वक जोड़ी गई।",
    });
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <Link to="/famous-poets" className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>सभी कवि देखें</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/4">
              <div className="relative rounded-lg overflow-hidden bg-muted p-6 text-center">
                <img
                  src={poet.avatar}
                  alt={poet.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-kavya-purple"
                />
                <h1 className="text-2xl font-bold mt-4 text-kavya-darkblue dark:text-kavya-lightpink">
                  {poet.name}
                </h1>
                <p className="text-muted-foreground">{poet.lifespan}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <Button size="sm" variant="outline" 
                    onClick={() => handleShareTwitter(poet.name)}
                    className="flex items-center gap-1">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline"
                    onClick={() => handleShareInstagram(poet.name)}
                    className="flex items-center gap-1">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="default" 
                    onClick={() => handleSave(poet.name)}
                    className="flex items-center gap-1">
                    <BookmarkPlus className="h-4 w-4" />
                    <span>सहेजें</span>
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 bg-muted rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-kavya-purple">जीवन परिचय</h2>
                <p className="text-sm">{poet.bio}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">जन्मस्थान</span>
                    <span>{poet.birthPlace}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">जन्म-मृत्यु</span>
                    <span>{poet.lifespan}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">प्रमुख कृतियाँ</h3>
                  <ul className="text-sm space-y-1">
                    {poet.majorWorks.map((work, index) => (
                      <li key={index} className="bg-background p-2 rounded">{work}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="poems" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="poems">कविताएँ</TabsTrigger>
                  <TabsTrigger value="comments">टिप्पणियाँ</TabsTrigger>
                  <TabsTrigger value="related">संबंधित कवि</TabsTrigger>
                </TabsList>
                
                <TabsContent value="poems" className="mt-6 space-y-8">
                  {poet.poems.map((poem) => (
                    <Card key={poem.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-kavya-darkblue dark:text-kavya-lightpink">{poem.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line mb-6">{poem.content}</p>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">अर्थ:</h4>
                          <p className="text-sm">{poem.meaning}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleLike(poem.title)}
                          >
                            <Heart className="h-4 w-4 text-kavya-pink" />
                            <span>{poem.likes}</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleSave(poem.title)}
                          >
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleShareTwitter(poem.title)}
                            >
                              <Twitter className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleShareInstagram(poem.title)}
                            >
                              <Instagram className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="comments" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">टिप्पणियाँ</CardTitle>
                      <CardDescription>कवि और उनकी कविताओं पर अपने विचार साझा करें</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <Textarea 
                          placeholder="अपनी टिप्पणी यहाँ लिखें..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleAddComment}>भेजें</Button>
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        {comments.map((comment) => (
                          <div key={comment.id} className="bg-muted p-4 rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://i.pravatar.cc/150?u=${comment.id}`} />
                                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{comment.user}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="mt-3 text-sm">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="related" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">संबंधित कवि</CardTitle>
                      <CardDescription>इसी युग और शैली के अन्य प्रसिद्ध कवि</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {famousPoets
                          .filter(p => p.id !== poet.id)
                          .slice(0, 4)
                          .map(relatedPoet => (
                            <Link 
                              key={relatedPoet.id} 
                              to={`/poet/${relatedPoet.id}`} 
                              className="block hover:bg-accent p-4 rounded-md transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={relatedPoet.avatar}
                                  alt={relatedPoet.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="font-medium">{relatedPoet.name}</h4>
                                  <p className="text-xs text-muted-foreground">{relatedPoet.lifespan}</p>
                                </div>
                              </div>
                            </Link>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PoetProfile;
