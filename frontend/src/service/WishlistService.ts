import { CreateWishlistDTO } from '../wishlists/types/CreateWishlistDTO';
import { WishlistDTO } from '../wishlists/types/WishlistDTO';
import axios from '../common/axios';

const createWishlist = async (createWishlistDTO: CreateWishlistDTO): Promise<WishlistDTO> => {
  const response = await axios.post('/Wishlist', createWishlistDTO);
  return response.data;
};

const fetchWishlists = async (): Promise<WishlistDTO[]> => {
  return (await axios.get('/Wishlist')).data;
};

export const WishlistService = {
  createWishlist,
  fetchWishlists
};
