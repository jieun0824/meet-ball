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
    setSelectedCollection({
      ...selectedCollection,
      [date]: [...selectedCollection[date], time],
    });
  };

  const deleteHandler = (date: string, time: number) => {
    setSelectedCollection({
      ...selectedCollection,
      [date]: selectedCollection[date].filter(
        (element: number) => element != time
      ),
    });
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
