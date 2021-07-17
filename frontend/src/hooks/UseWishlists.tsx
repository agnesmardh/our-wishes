import { WishlistDTO } from '../wishlists/types/WishlistDTO';
import { WishlistService } from '../service/WishlistService';
import { useEffect, useState } from 'react';

export const useWishlists = (): [
  WishlistDTO[] | undefined,
  (value: ((prevState: WishlistDTO[] | undefined) => WishlistDTO[] | undefined) | WishlistDTO[] | undefined) => void
] => {
  const [wishlists, setWishlists] = useState<WishlistDTO[] | undefined>();
  useEffect(() => {
    const fetchWishlists = async () => {
      const fetchedWishlists = await WishlistService.fetchWishlists();
      setWishlists(fetchedWishlists);
    };
    fetchWishlists();
  }, []);
  return [wishlists, setWishlists];
};
