
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import PoemList from "@/components/PoemList";
import { BookOpen, PenLine, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-secondary to-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 hindi-text">
              <span className="text-kavya-orange">काव्य</span>पथ पर आपका स्वागत है
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              हिंदी कविता का सबसे बड़ा डिजिटल मंच, जहां आप पढ़ सकते हैं, लिख सकते हैं, और साझा कर सकते हैं।
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-primary flex items-center gap-2">
                <PenLine className="w-5 h-5" />
                <span>अपनी कविता लिखें</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
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
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-kavya-orange" />
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
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        activeCategory === category.id ? "default" : "ghost"
                      }
                      onClick={() => setActiveCategory(category.id)}
                      className="w-full justify-start"
                    >
                      {category.name} ({category.nameEn})
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">हमसे जुड़ें</h2>
                <p className="text-muted-foreground mb-4">
                  काव्यपथ के साथ जुड़कर अपनी कविताओं को दुनिया के साथ साझा करें और प्रतिष्ठित कवियों से सीखें।
                </p>
                <Button className="w-full btn-primary">अभी साइन अप करें</Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold hindi-text">
                {activeCategory
                  ? `${categories.find((c) => c.id === activeCategory)?.name} कविताएँ`
                  : "नवीनतम कविताएँ"}
              </h2>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
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
