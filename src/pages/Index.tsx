
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import PoemList from "@/components/PoemList";
import { BookOpen, PenLine, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import TypewriterEffect from "@/components/TypewriterEffect";
import PenAnimation from "@/components/PenAnimation";
import DailyShlok from "@/components/DailyShlok";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );

  // Texts to alternate between Hindi and English
  const alternatingTexts = [
    "काव्यपथ पर आपका स्वागत है",
    "Welcome to Kavyapath",
    "कविता की दुनिया में आपका हार्दिक स्वागत",
    "A heartfelt welcome to the world of poetry",
    "हिंदी काव्य का डिजिटल संगम",
    "Digital confluence of Hindi poetry"
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-kavya-darkblue to-kavya-purple">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 hindi-text text-white">
              <span className="text-kavya-pink float-animation">काव्य</span>पथ
            </h1>
            <div className="flex justify-center space-x-4 mb-6">
              <PenAnimation />
            </div>
            <div className="text-2xl md:text-3xl font-medium mb-6 min-h-[3rem] hindi-text text-kavya-lightpink">
              <TypewriterEffect 
                texts={alternatingTexts} 
                typingSpeed={100}
                deletingSpeed={80}
                delayBetweenTexts={1500}
              />
            </div>
            <p className="text-lg md:text-xl text-kavya-lightpink mb-8 fade-in-up">
              हिंदी कविता का सबसे बड़ा डिजिटल मंच, जहां आप पढ़ सकते हैं, लिख सकते हैं, और साझा कर सकते हैं।
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in-up">
              <Link to="/signup">
                <Button className="btn-primary bg-kavya-pink hover:bg-kavya-lavender flex items-center gap-2 hover:scale-105 transition-transform">
                  <PenLine className="w-5 h-5" />
                  <span>अपनी कविता लिखें</span>
                </Button>
              </Link>
              <Button variant="outline" className="border-kavya-pink text-kavya-lightpink hover:bg-kavya-pink/20 flex items-center gap-2 hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
                <span>कविताएँ पढ़ें</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-6">
              {/* Daily Shlok Widget */}
              <div className="mb-6 fade-in-up">
                <DailyShlok />
              </div>

              <div className="bg-card border border-border rounded-lg p-6 mb-6 fade-in-up">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-kavya-darkblue dark:text-kavya-lightpink">
                  <TrendingUp className="w-5 h-5 text-kavya-pink" />
                  <span>लोकप्रिय श्रेणियाँ</span>
                </h2>
                <div className="space-y-3">
                  <Button
                    variant={activeCategory === undefined ? "default" : "ghost"}
                    onClick={() => setActiveCategory(undefined)}
                    className="w-full justify-start"
                  >
                    सभी श्रेणियाँ
                  </Button>
                  {categories.map((category, index) => (
                    <Button
                      key={category.id}
                      variant={
                        activeCategory === category.id ? "default" : "ghost"
                      }
                      onClick={() => setActiveCategory(category.id)}
                      className="w-full justify-start"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {category.name} ({category.nameEn})
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 fade-in-up">
                <h2 className="text-xl font-bold mb-4 text-kavya-darkblue dark:text-kavya-lightpink">हमसे जुड़ें</h2>
                <p className="text-muted-foreground mb-4">
                  काव्यपथ के साथ जुड़कर अपनी कविताओं को दुनिया के साथ साझा करें और प्रतिष्ठित कवियों से सीखें।
                </p>
                <Link to="/signup">
                  <Button className="w-full bg-kavya-lavender hover:bg-kavya-purple text-white hover:scale-105 transition-transform">अभी साइन अप करें</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6 fade-in-up">
              <h2 className="text-2xl font-bold hindi-text text-kavya-darkblue dark:text-kavya-lightpink">
                {activeCategory
                  ? `${categories.find((c) => c.id === activeCategory)?.name} कविताएँ`
                  : "नवीनतम कविताएँ"}
              </h2>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:scale-105 transition-transform">
                <Filter className="w-4 h-4" />
                <span>फ़िल्टर</span>
              </Button>
            </div>
            <PoemList categoryFilter={activeCategory} />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
