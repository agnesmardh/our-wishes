import React from 'react';
import { Wishlists } from './components/Wishlists';
import { Col, Row } from 'react-bootstrap';
import { useWishlists } from '../hooks/UseWishlists';
import { CenteredLoadingIndicator } from '../common/components/loading-indicator/CenteredLoadingIndicator';
import { WishlistDTO } from './types/WishlistDTO';

export const WishlistsContainer: React.FC = () => {
  const [wishlists, setWishlists] = useWishlists();

  if (!wishlists) {
    return <CenteredLoadingIndicator />;
  }

  return (
    <Row>
      <Col>
        <Wishlists
          wishlists={wishlists}
          addWishlist={(wishlist: WishlistDTO) => setWishlists([...wishlists, wishlist])}
        />
      </Col>
    </Row>
  );
};
