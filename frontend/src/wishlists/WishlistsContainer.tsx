import React from 'react';
import { Wishlists } from './components/Wishlists';
import { Col, Row } from 'react-bootstrap';
import { useWishlists } from '../hooks/UseWishlists';

export const WishlistsContainer: React.FC = () => {
  const wishlists = useWishlists();

  if (!wishlists) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col>
        <Wishlists wishlists={wishlists} />
      </Col>
    </Row>
  );
};
