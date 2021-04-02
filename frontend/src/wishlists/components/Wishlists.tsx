import React from 'react';
import { WishlistDTO } from '../types/WishlistDTO';
import { Wishlist } from './Wishlist';

interface Props {
  wishlists: WishlistDTO[];
}

export const Wishlists: React.FC<Props> = ({ wishlists }: Props) => {
  const wishlistTags = wishlists.map(wishlist => <Wishlist key={wishlist.id} wishlist={wishlist} />);
  return (
    <>
      <div>Wishlists:</div>
      {wishlistTags}
    </>
  );
};
