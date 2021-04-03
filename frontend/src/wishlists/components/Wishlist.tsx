import React from 'react';
import { WishlistDTO } from '../types/WishlistDTO';
import { Wish } from './Wish';

interface Props {
  wishlist: WishlistDTO;
}

export const Wishlist: React.FC<Props> = ({ wishlist }: Props) => {
  const wishes = wishlist.wishes.map(wish => <Wish key={wish.id} wish={wish} />);
  return (
    <>
      <span>Owner: {wishlist.owner}</span>
      {wishes}
    </>
  );
};
