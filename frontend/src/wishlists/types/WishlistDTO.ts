import { WishDTO } from './WishDTO';

export interface WishlistDTO {
  id: string;
  owner: string;
  wishes: WishDTO[];
}
