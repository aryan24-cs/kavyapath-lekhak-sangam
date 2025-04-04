
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

type Shlok = {
  text: string;
  translation: string;
  source: string;
  date: string;
};

const shloks: Shlok[] = [
  {
    text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "तुम्हें कर्म करने का ही अधिकार है, फलों पर कभी नहीं। कर्म के फल की आकांक्षा मत करो, लेकिन कर्महीन अवस्था में भी आसक्त मत हो।",
    source: "श्रीमद्भगवद्गीता - अध्याय 2, श्लोक 47",
    date: new Date().toISOString()
  },
  {
    text: "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
    translation: "विद्या विनम्रता प्रदान करती है, विनम्रता से पात्रता आती है, पात्रता से धन मिलता है, धन से धर्म और फिर सुख की प्राप्ति होती है।",
    source: "नीति शतकम् - भर्तृहरि",
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    text: "अहिंसा परमो धर्मः धर्म हिंसा तथैव च।",
    translation: "अहिंसा सबसे बड़ा धर्म है, और कभी-कभी धर्म की रक्षा के लिए हिंसा भी आवश्यक है।",
    source: "महाभारत",
    date: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    text: "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।",
    translation: "सत्य की ही जीत होती है, असत्य की नहीं। सत्य के द्वारा ही देवयान मार्ग विस्तृत होता है।",
    source: "मुण्डकोपनिषद् - अध्याय 3, खंड 1, मंत्र 6",
    date: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    text: "यथा वृक्षस्तथा बीजं यथा बीजं तथा फलम्।",
    translation: "जैसा वृक्ष होता है, वैसा ही बीज होता है और जैसा बीज होता है, वैसा ही फल होता है।",
    source: "वेदांत दर्शन",
    date: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    text: "आत्मवत् सर्वभूतेषु यः पश्यति स पण्डितः।",
    translation: "जो सभी प्राणियों में अपने आत्मा के समान देखता है, वही पंडित है।",
    source: "हितोपदेश",
    date: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    text: "मातृदेवो भव। पितृदेवो भव। आचार्यदेवो भव। अतिथिदेवो भव॥",
    translation: "माता को देवता जानो। पिता को देवता जानो। आचार्य को देवता जानो। अतिथि को देवता जानो।",
    source: "तैत्तिरीय उपनिषद् - अध्याय 1, अनुवाक 11",
    date: new Date(Date.now() - 6 * 86400000).toISOString()
  }
];

const DailyShlok = () => {
  const [shlok, setShlok] = useState<Shlok | null>(null);

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Use the date as a seed for getting a consistent shlok for the day
    const seed = parseInt(today.replace(/-/g, ''), 10);
    const index = seed % shloks.length;
    
    setShlok(shloks[index]);
  }, []);

  if (!shlok) return null;

  return (
    <Card className="bg-gradient-to-br from-card to-background/80 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>आज का श्लोक</span>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(shlok.date), { addSuffix: true })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium text-center mb-2 text-primary">{shlok.text}</p>
        <p className="text-sm text-muted-foreground mb-2">{shlok.translation}</p>
        <p className="text-xs text-right italic">— {shlok.source}</p>
      </CardContent>
    </Card>
  );
};

export default DailyShlok;
