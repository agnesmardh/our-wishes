import { WishDTO } from './WishDTO';

export interface WishlistDTO {
  id: string;
  title: string;
  owner: string;
  wishes: WishDTO[];
}
