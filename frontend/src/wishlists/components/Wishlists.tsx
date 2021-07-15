import React from 'react';
import { WishlistDTO } from '../types/WishlistDTO';
import { Wishlist } from './Wishlist';
import { Masonry, RenderComponentProps } from 'masonic';
import { WishDTO } from '../types/WishDTO';

interface Props {
  wishlists: WishlistDTO[];
}

const WishlistCard = ({ index, data, width }: RenderComponentProps<WishlistDTO>) => {
  return (
    <div style={{ width: width }}>
      <Wishlist key={index} wishlist={data} />
    </div>
  );
};

const generateWish = (numberOfWishes: number): WishDTO[] => {
  const wishesList: WishDTO[] = [];
  for (let i = 0; i < numberOfWishes; i++) {
    const wish: WishDTO = {
      boughtBy: undefined,
      id: `${i}`,
      link: '',
      title: `Title of wish ${i}`
    };
    wishesList.push(wish);
  }
  return wishesList;
};

export const Wishlists: React.FC<Props> = ({ wishlists }: Props) => {
  if (wishlists.length > 0) {
    for (let i = 0; i < 15; i++) {
      wishlists.push({
        archived: '',
        deadline: '',
        id: `${i}`,
        owner: wishlists[0].owner,
        shareableLink: '',
        title: `Wishlist #${i + 1}`,
        wishes: generateWish(i + 4)
      });
    }
  }
  return (
    <Masonry
      items={wishlists}
      columnGutter={8}
      columnWidth={500}
      overscanBy={5}
      render={({ index, data, width }) => WishlistCard({ index, data, width })}
    />
  );
};
