"use client";

import { useState } from "react";

const items = [
  { type: "rock", icon: "🪨" },
  { type: "flower", icon: "🌸" },
  { type: "tree", icon: "🌲" },
  { type: "bamboo", icon: "🎋" },
];

export function ZenGarden() {
  const [placedItems, setPlacedItems] = useState<
    Array<{
      type: string;
      icon: string;
      x: number;
      y: number;
    }>
  >([]);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPlacedItems([...placedItems, { ...selectedItem, x, y }]);
  };

  return <></>;
}
