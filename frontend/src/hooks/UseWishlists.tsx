import { WishlistDTO } from '../wishlists/types/WishlistDTO';
import { useGet } from './UseGet';

export const useWishlists = (): WishlistDTO[] | null => {
  return useGet<WishlistDTO[]>('Wishlist');
};
