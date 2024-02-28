import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

export default function useDraggedArea() {
  const { data: draggedArea, mutate: setDraggedArea } = useSWRImmutable(
    'draggedArea',
    {
      fallbackData: [],
    }
  );

  useEffect(() => {
    console.log(draggedArea);
  }, [draggedArea]);

  return [draggedArea, setDraggedArea];
}
