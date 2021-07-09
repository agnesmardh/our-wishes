import { WishlistDTO } from '../../types/WishlistDTO';

export const wishlistMock: WishlistDTO = {
  id: '1',
  owner: 'Mattias',
  title: 'titel',
  wishes: [
    {
      id: '1',
      title: 'wishText',
      bought: false
    }
  ]
};
