import { WishlistDTO } from '../wishlists/types/WishlistDTO';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useGet = <T,>(path: string): T | null => {
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

export const useWishlists = (): WishlistDTO[] | null => {
  return useGet<WishlistDTO[]>('Wishlist/1');
};
