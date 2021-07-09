import React from 'react';
import { WishlistDTO } from '../types/WishlistDTO';
import { Wishlist } from './Wishlist';
import { ListGroup } from 'react-bootstrap';

interface Props {
  wishlists: WishlistDTO[];
  activeWishlist: string | undefined;
  setActiveWishlist: (value: string) => void;
}

const createWishlist = (
  wishlist: WishlistDTO,
  activeWishlist: string | undefined,
  setActiveWishlist: (value: string) => void
) => {
  return (
    <Wishlist
      key={wishlist.id}
      wishlist={wishlist}
      active={activeWishlist === wishlist.id}
      onClick={() => setActiveWishlist(wishlist.id)}
    />
  );
};

export const Wishlists: React.FC<Props> = ({ wishlists, activeWishlist, setActiveWishlist }: Props) => {
  const wishlistTags = wishlists.map(wishlist => createWishlist(wishlist, activeWishlist, setActiveWishlist));
  return (
    <ListGroup>
      <div>Wishlists:</div>
      {wishlistTags}
    </ListGroup>
  );
};
