import { useEffect, useState } from 'react';
export default function useCarousel(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };
  const handleNextBtn = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };
  const handlePrevBtn = () => {
    if (currentSlide == 0) {
      setCurrentSlide(2);
    } else {
      setCurrentSlide((currentSlide - 1) % totalSlides);
    }
  };

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNextBtn();
      } else if (mouseUpClientX > mouseDownClientX) {
        handlePrevBtn();
      }
    }
  }, [mouseUpClientX]);
  return { currentSlide, onMouseDown, onMouseUp };
}
