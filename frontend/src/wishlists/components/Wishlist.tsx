import React from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { WishlistDTO } from '../types/WishlistDTO';
import styled from 'styled-components';
import { Wish } from './Wish';

interface Props {
  wishlist: WishlistDTO;
}

export const Wishlist: React.FC<Props> = ({ wishlist }: Props) => {
  const wishes = wishlist.wishes.map(wish => <Wish key={wish.id} wish={wish} />);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>{wishlist.title}</Col>
          <WishlistOwner>{wishlist.owner.firstName}</WishlistOwner>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup>{wishes}</ListGroup>
      </Card.Body>
    </Card>
  );
};

const WishlistOwner = styled(Col)`
  text-align: right;
  justify-content: center;
  align-self: center;
  font-size: 8pt;
  font-style: italic;
`;
