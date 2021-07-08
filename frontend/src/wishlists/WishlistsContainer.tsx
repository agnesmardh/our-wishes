import React, { useState } from 'react';
import { Wishlists } from './components/Wishlists';
import { Col, Row } from 'react-bootstrap';
import { Wish } from './components/Wish';
import { useWishlists } from '../hooks/UseWishlists';

export const WishlistsContainer: React.FC = () => {
  const wishlists = useWishlists();
  const [activeWishlist, setActiveWishlist] = useState(!wishlists ? undefined : wishlists[0].id);

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
        List of Wishes
        {wishes}
      </Col>
      <Col>Management of Wishlists</Col>
    </Row>
  );
};
