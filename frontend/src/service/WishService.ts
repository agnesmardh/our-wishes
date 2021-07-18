import axios from '../common/axios';
import { WishDTO } from '../wishlists/types/WishDTO';

const deleteWish = async (wishDTO: WishDTO): Promise<void> => {
  const response = await axios.delete(`/Wish/${wishDTO.id}`);
  return response.data;
};

export const WishService = {
  deleteWish
};
