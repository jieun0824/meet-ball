import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

export default function useSelectedCollection() {
  // const meetId = useParams().meetId as string;
  // const userTimetable = async () => (await getTimeTable(meetId)).timeTable;
  const { data: selectedCollection, mutate: setSelectedCollection } =
    useSWRImmutable('selectedCollection', {
      fallbackData: {},
    });

  const addHandler = (date: string, time: number) => {
    if (!selectedCollection[date].includes(time)) {
      setSelectedCollection({
        ...selectedCollection,
        [date]: [...selectedCollection[date], time],
      });
    }
  };

  const deleteHandler = (date: string, time: number) => {
    if (selectedCollection[date].includes(time)) {
      const newArray = selectedCollection[date].filter(
        (element: number) => element != time
      );
      setSelectedCollection({
        ...selectedCollection,
        [date]: newArray,
      });
    }
  };

  useEffect(() => {
    console.log(selectedCollection);
  }, [selectedCollection]);

  return {
    selectedCollection,
    setSelectedCollection,
    addHandler,
    deleteHandler,
  };
}
