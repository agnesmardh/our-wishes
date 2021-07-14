import React from 'react';
import { Wishlists } from './components/Wishlists';
import { Col, Row } from 'react-bootstrap';
import { useWishlists } from '../hooks/UseWishlists';
import { CenteredLoadingIndicator } from '../common/components/loading-indicator/CenteredLoadingIndicator';

export const WishlistsContainer: React.FC = () => {
  const wishlists = useWishlists();

  if (!wishlists) {
    return <CenteredLoadingIndicator />;
  }

  return (
    <Row>
      <Col>
        <Wishlists wishlists={wishlists} />
      </Col>
    </Row>
  );
};
