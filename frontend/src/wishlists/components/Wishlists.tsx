import React, { useState } from 'react';
import { WishlistDTO } from '../types/WishlistDTO';
import { Wishlist } from './Wishlist';
import { Masonry, RenderComponentProps } from 'masonic';
import { CreateWishlistButton } from './CreateWishlistButton';
import { CreateWishlistModal } from './CreateWishlistModal';
import { CreateWishlistDTO } from '../types/CreateWishlistDTO';
import { useCreateWishlist } from '../../hooks/UseCreateWishlist';

interface Props {
  wishlists: WishlistDTO[];
  addWishlist: (wishlist: WishlistDTO) => void;
}

const handleCreateWishlist = async (
  createWishlist: (createWishlistDTO: CreateWishlistDTO) => Promise<WishlistDTO>,
  createWishlistDTO: CreateWishlistDTO
): Promise<WishlistDTO> => {
  return await createWishlist(createWishlistDTO);
};

const WishlistCard = ({ index, data, width }: RenderComponentProps<WishlistDTO>) => {
  return (
    <div style={{ width: width }}>
      <Wishlist key={index} wishlist={data} />
    </div>
  );
};

export const Wishlists: React.FC<Props> = ({ wishlists, addWishlist }: Props) => {
  const { createWishlist } = useCreateWishlist();
  const [showCreateWishlistModal, setShowCreateWishlistModal] = useState(false);

  return (
    <>
      <Masonry
        items={wishlists}
        columnGutter={8}
        columnWidth={500}
        overscanBy={5}
        render={({ index, data, width }) => WishlistCard({ index, data, width })}
      />
      <CreateWishlistButton onClick={() => setShowCreateWishlistModal(true)} />
      <CreateWishlistModal
        onCloseModal={async (createWishlistDTO, shouldCreateWishlist) => {
          setShowCreateWishlistModal(false);
          if (shouldCreateWishlist) {
            const newWishlist = await handleCreateWishlist(createWishlist, createWishlistDTO);
            addWishlist(newWishlist);
          }
        }}
        show={showCreateWishlistModal}
      />
    </>
  );
};
