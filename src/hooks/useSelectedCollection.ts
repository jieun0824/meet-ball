import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

export default function useSelectedCollection() {
  // const meetId = useParams().meetId as string;
  // const userTimetable = async () => (await getTimeTable(meetId)).timeTable;
  const { data: selectedCollection, mutate: setSelectedCollection } =
    useSWRImmutable('selectedCollection', {
      fallbackData: {},
    });

  // const { data: dragType, mutate: setDragType } = useSWRImmutable('dragType', {
  //   fallbackData: null,
  // });

  const addHandler = async (date: string, time: number) => {
    if (!selectedCollection[date].includes(time)) {
      await setSelectedCollection({
        ...selectedCollection,
        [date]: [...selectedCollection[date], time],
      });
    }
  };

  const deleteHandler = async (date: string, time: number) => {
    if (selectedCollection[date].includes(time)) {
      await setSelectedCollection({
        ...selectedCollection,
        [date]: selectedCollection[date].filter(
          (element: number) => element != time
        ),
      });
    }
  };

  useEffect(() => {
    console.log(selectedCollection);
  }, [selectedCollection]);

  // const onMouseDownHandler = (e: React.MouseEvent) => {
  //   if (
  //     selectedCollection[e.target.dataset.date as string].includes(
  //       parseInt(e.target.dataset.time!)
  //     )
  //   ) {
  //     setDragType('DELETE');
  //     console.log('DELETE');
  //   } else {
  //     setDragType('ADD');
  //     console.log('ADD');
  //   }
  // };

  return {
    selectedCollection,
    setSelectedCollection,
    addHandler,
    deleteHandler,
    // setDragType,
    // dragType,
    // setDragType,
    // onMouseDownHandler,
  };
}
