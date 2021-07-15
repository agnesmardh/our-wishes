import React from 'react';
import { WishlistsContainer } from '../wishlists/WishlistsContainer';
import { Header } from './Header';
import { Col, Container, Row } from 'react-bootstrap';

export const HomeContainer: React.FC = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col>
            <WishlistsContainer />
          </Col>
        </Row>
      </Container>
    </>
  );
};
