import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { WishlistDTO } from '../types/WishlistDTO';

interface Props {
  wishlist: WishlistDTO;
  active: boolean;
  onClick: () => void;
}

export const Wishlist: React.FC<Props> = ({ wishlist, active, onClick }: Props) => {
  return (
    <ListGroup.Item role={'button'} active={active} onClick={onClick}>
      {wishlist.title}
    </ListGroup.Item>
  );
};
