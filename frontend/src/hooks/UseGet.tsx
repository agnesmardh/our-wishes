import { useEffect, useState } from 'react';
import axios from '../common/axios';

export const useGet = <T,>(path: string): T | null => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(path);
      setData(response.data);
    };
    fetchData();
  }, [path]);
  return data;
};
