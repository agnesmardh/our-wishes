import React, { useState } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { WishlistDTO } from '../types/WishlistDTO';
import styled from 'styled-components';
import { Wish } from './Wish';
import { WishService } from '../../service/WishService';

interface Props {
  wishlist: WishlistDTO;
}

export const Wishlist: React.FC<Props> = ({ wishlist }: Props) => {
  const [wishes, setWishes] = useState(wishlist.wishes);

  const wishComponents = wishes.map(wish => (
    <Wish
      key={wish.id}
      deleteWish={async wishToDelete => {
        await WishService.deleteWish(wishToDelete);
        setWishes(wishes.filter(wish => wish.id !== wishToDelete.id));
      }}
      wish={wish}
    />
  ));

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>{wishlist.title}</Col>
          <WishlistOwner>{wishlist.owner.firstName}</WishlistOwner>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup>{wishComponents}</ListGroup>
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
