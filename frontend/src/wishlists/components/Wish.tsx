import React from 'react';
import { WishDTO } from '../types/WishDTO';

interface Props {
  wish: WishDTO;
}

export const Wish: React.FC<Props> = ({ wish }: Props) => {
  return <div>Wish: {wish.text}</div>;
};
