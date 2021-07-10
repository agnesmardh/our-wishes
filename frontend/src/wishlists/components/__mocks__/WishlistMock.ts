import { WishlistDTO } from '../../types/WishlistDTO';
import { UserDTO } from '../../types/UserDTO';

export const userMock: UserDTO = {
  firstName: '',
  id: '',
  lastName: '',
  profileImageUrl: '',
  username: ''
};

export const wishlistMock: WishlistDTO = {
  archived: '',
  deadline: '',
  shareableLink: '',
  id: '1',
  owner: userMock,
  title: 'titel',
  wishes: [
    {
      id: '1',
      title: 'wishText',
      boughtBy: userMock,
      link: ''
    }
  ]
};
