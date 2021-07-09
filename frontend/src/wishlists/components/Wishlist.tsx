import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { WishlistDTO } from '../types/WishlistDTO';
import styled from 'styled-components';

interface Props {
  wishlist: WishlistDTO;
  active: boolean;
  onClick: () => void;
}

export const Wishlist: React.FC<Props> = ({ wishlist, active, onClick }: Props) => {
  return (
    <ListGroup.Item role={'button'} active={active} onClick={onClick}>
      <Row>
        <Col>{wishlist.title}</Col>
        <WishlistOwner>{wishlist.owner}</WishlistOwner>
      </Row>
    </ListGroup.Item>
  );
};

const WishlistOwner = styled(Col)`
  text-align: right;
  justify-content: center;
  align-self: center;
  font-size: 8pt;
  font-style: italic;
`;
