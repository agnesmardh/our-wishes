import { WishlistDTO } from '../wishlists/types/WishlistDTO';
import { CreateWishlistDTO } from '../wishlists/types/CreateWishlistDTO';
import { WishlistService } from '../service/WishlistService';

interface UseCreateWishlistType {
  createWishlist: (createWishlistDTO: CreateWishlistDTO) => Promise<WishlistDTO>;
}

export const useCreateWishlist = (): UseCreateWishlistType => {
  return {
    createWishlist: (createWishlistDTO): Promise<WishlistDTO> => {
      return WishlistService.createWishlist(createWishlistDTO);
    }
  };
};
