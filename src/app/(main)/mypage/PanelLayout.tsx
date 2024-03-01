'use client';

import { useState } from 'react';

export default function PanelLayout({
  titles,
  panels,
}: {
  titles: string[];
  panels: React.ReactNode[];
}) {
  const [currentPanel, setCurrentPanel] = useState(0);
  function Navigator() {
    return (
      <div className="flex px-0.5 py-0.5 rounded-lg bg-cardColor justify-center">
        {titles.map((title, index) => (
          <button
            key={index}
            onClick={() => setCurrentPanel(index)}
            className={`cursor-pointer px-10 py-2 m-2 rounded-lg flex justify-center ${
              currentPanel === index ? 'bg-pointColor text-black' : 'text-white'
            }`}
          >
            {title}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Navigator />
      {panels[currentPanel]}
    </div>
  );
}
