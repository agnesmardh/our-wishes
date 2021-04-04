import React, { useEffect, useState } from 'react';
import { WishlistDTO } from './types/WishlistDTO';
import { Wishlists } from './components/Wishlists';
import { Col, Row } from 'react-bootstrap';
import { Wish } from './components/Wish';

const wishlistsMock: WishlistDTO[] = [
  {
    id: '1',
    title: 'Önskelista 1',
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
  },
  {
    id: '2',
    title: 'Önskelista 2',
    owner: 'Agnes',
    wishes: [
      {
        id: '3',
        text: 'Choklad'
      },
      {
        id: '4',
        text: 'Ett bibliotek'
      }
    ]
  }
];

export const WishlistsContainer: React.FC = () => {
  const [wishlists, setWishLists] = useState<WishlistDTO[]>();
  const [activeWishlist, setActiveWishlist] = useState(!wishlists ? undefined : wishlists[0].id);

  useEffect(() => {
    const fetchData = async () => {
      setWishLists(wishlistsMock);
    };

    fetchData();
  }, []);

  if (!wishlists) {
    return <div>Loading...</div>;
  }

  const active = wishlists.find(wishlist => wishlist.id === activeWishlist);

  const wishes = active?.wishes.map(wish => <Wish key={wish.id} wish={wish} />);

  return (
    <Row>
      <Col>
        <Wishlists wishlists={wishlists} activeWishlist={activeWishlist} setActiveWishlist={setActiveWishlist} />
      </Col>
      <Col>
        Lista av önskninar
        {wishes}
      </Col>
      <Col>Managering</Col>
    </Row>
  );
};
