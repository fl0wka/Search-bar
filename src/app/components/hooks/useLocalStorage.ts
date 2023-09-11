/****** NOT USED ******/

import { useEffect, useState } from 'react';

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

function getLocalStorage<T>(key: string, defaultValue: T): T | undefined {
  if (typeof window !== 'undefined') {
    const savedItem = localStorage.getItem(key);
    const parseItem = savedItem !== null ? JSON.parse(savedItem) : defaultValue;
    return parseItem;
  }
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): ReturnType<T> => {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
