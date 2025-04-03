
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { poems } from "@/data/poems";
import PoemCard from "@/components/PoemCard";
import { BookOpen, Filter } from "lucide-react";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    categories[0]?.id
  );

  // Get language preference from Navbar (in a real app, this would be a global state or context)
  // For now, we'll just simulate this by checking the URL for a query param
  const isHindi = !window.location.search.includes('lang=en');

  const getLanguageText = (hindiText: string, englishText: string) => {
    return isHindi ? hindiText : englishText;
  };

  // Get poems for the active category
  const filteredPoems = activeCategory
    ? poems.filter((poem) => poem.categoryId === activeCategory)
    : poems;

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="w-full md:w-1/4">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-kavya-pink" />
                  <span>{getLanguageText("कविता श्रेणियाँ", "Poem Categories")}</span>
                </CardTitle>
                <CardDescription>
                  {getLanguageText("अपनी पसंद की श्रेणी चुनें", "Choose your preferred category")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className="w-full justify-start mb-2"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span>{isHindi ? category.name : category.nameEn}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Poems in selected category */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">
                {activeCategory
                  ? getLanguageText(
                      `${categories.find((c) => c.id === activeCategory)?.name} कविताएँ`, 
                      `${categories.find((c) => c.id === activeCategory)?.nameEn} Poems`
                    )
                  : getLanguageText("सभी कविताएँ", "All Poems")}
              </h1>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>{getLanguageText("फ़िल्टर", "Filter")}</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredPoems.length > 0 ? (
                filteredPoems.map((poem) => (
                  <PoemCard key={poem.id} poem={poem} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    {getLanguageText("इस श्रेणी में कोई कविता नहीं मिली", "No poems found in this category")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Categories;
