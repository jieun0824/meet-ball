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
const Navigator = () => {
  return (
    <div className="flex px-0.5 py-0.5 rounded-lg bg-gray-600 justify-center">
      {titles.map((title, index) => (
        <button
          key={index}
          onClick={() => setCurrentPanel(index)}
          className={`cursor-pointer px-10 py-2 m-2 rounded-lg text-black flex justify-center ${
            currentPanel === index ? 'bg-pointColor' : ''
          }`}
        >
          {title}
        </button>
      ))}
    </div>
  );
};
  return (
    <>
      <Navigator />
      {panels[currentPanel]}
    </>
  );
}
