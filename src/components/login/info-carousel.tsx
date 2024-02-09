'use client';

import useCarousel from '@/hooks/useCarousel';
import InfoCard from './info-card';

export default function InfoCarousel() {
  const { currentSlide, onMouseDown, onMouseUp, cardRef } = useCarousel(3, 320);
  return (
    <div className="mt-8 w-80 mb-4 overflow-hidden relative flex h-full">
      <div
        className="grid grid-cols-3 gap-80"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={cardRef}
      >
        <InfoCard />
      </div>
    </div>
  );
}
