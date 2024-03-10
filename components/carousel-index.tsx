import { CarouselIndexIcon } from './icon';

export default function CarouselIndex({
  currentSlide,
}: {
  currentSlide: number;
}) {
  return (
    <div className="flex justify-center p-4 ">
      <CarouselIndexIcon
        className={`mr-2 top-2 ${currentSlide == 0 ? 'text-gray-200' : 'text-gray-500'}`}
        size={8}
      />
      <CarouselIndexIcon
        className={`mr-2 ${currentSlide == 1 ? 'text-gray-200' : 'text-gray-500'}`}
        size={8}
      />
      <CarouselIndexIcon
        className={`${currentSlide == 2 ? 'text-gray-200' : 'text-gray-500'}`}
        size={8}
      />
    </div>
  );
}
