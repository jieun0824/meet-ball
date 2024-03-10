import { useState } from 'react';

export default function useMultiSelect<T>(state: T[]) {
  const [selected, setSelected] = useState<T[]>(state);

  //select multiple dates
  const handleSelected = (s: T) => {
    if (selected.includes(s)) {
      const newArr = selected.filter(a => {
        return a != s;
      });
      setSelected(newArr);
    } else {
      setSelected([...selected, s]);
    }
  };

  return { selected, handleSelected };
}
