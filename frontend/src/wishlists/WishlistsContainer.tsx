import React, { useEffect, useState } from 'react';
import { WishlistDTO } from './types/WishlistDTO';
import { Wishlists } from './components/Wishlists';

const wishlistsMock: WishlistDTO = {
  id: '1',
  owner: 'Mattias',
  wishes: [
    {
      id: '1',
      text: 'Gameboy Color'
    },
    {
      id: '2',
      text: 'En ros'
    }
  ]
};

export const WishlistsContainer: React.FC = () => {
  const [wishlists, setWishLists] = useState<WishlistDTO[]>();

  useEffect(() => {
    const fetchData = async () => {
      setWishLists([wishlistsMock]);
    };

    fetchData();
  }, []);

  if (!wishlists) {
    return <div>Loading...</div>;
  }

  return <Wishlists wishlists={wishlists} />;
};
