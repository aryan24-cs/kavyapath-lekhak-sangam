
import React from "react";
import { poems } from "@/data/poems";
import PoemCard from "./PoemCard";

type PoemListProps = {
  categoryFilter?: string;
};

const PoemList = ({ categoryFilter }: PoemListProps) => {
  const filteredPoems = categoryFilter
    ? poems.filter((poem) => poem.categoryId === categoryFilter)
    : poems;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {filteredPoems.map((poem) => (
        <PoemCard key={poem.id} poem={poem} />
      ))}
    </div>
  );
};

export default PoemList;
