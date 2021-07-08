import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGet = <T,>(path: string): T | null => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://localhost:5001/${path}`);
      setData(response.data);
    };
    fetchData();
  }, [path]);
  return data;
};
