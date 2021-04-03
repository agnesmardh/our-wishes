import React from 'react';
import { WishlistsContainer } from '../wishlists/WishlistsContainer';
import { Header } from './Header';
import { Col, Container, Row } from 'react-bootstrap';

export const HomeContainer: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
          <WishlistsContainer />
        </Col>
      </Row>
    </Container>
  );
};
