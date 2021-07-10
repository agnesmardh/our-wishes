import { WishDTO } from './WishDTO';
import { UserDTO } from './UserDTO';

export interface WishlistDTO {
  id: string;
  title: string;
  owner: UserDTO;
  wishes: WishDTO[];
  archived: string;
  deadline: string;
  shareableLink: string;
}
