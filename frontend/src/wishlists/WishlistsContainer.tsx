import React from 'react';
import { Wishlists } from './components/Wishlists';
import { Col, Row } from 'react-bootstrap';
import { useWishlists } from '../hooks/UseWishlists';
import { LoadingIndicator } from '../common/components/loading-indicator/LoadingIndicator';
import styled from 'styled-components';

export const WishlistsContainer: React.FC = () => {
  const wishlists = useWishlists();

  if (!wishlists) {
    return (
      <LoadingContainer>
        <LoadingIndicator />
      </LoadingContainer>
    );
  }

  return (
    <Row>
      <Col>
        <Wishlists wishlists={wishlists} />
      </Col>
    </Row>
  );
};

const LoadingContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
