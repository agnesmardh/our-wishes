import { UserDTO } from './UserDTO';

export interface WishDTO {
  id: string;
  title: string;
  boughtBy: UserDTO | undefined;
  link: string;
}
