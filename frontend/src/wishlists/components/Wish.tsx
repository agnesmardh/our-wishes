import React, { useState } from 'react';
import { WishDTO } from '../types/WishDTO';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { DeleteWishModal } from './DeleteWishModal';

interface Props {
  wish: WishDTO;
  deleteWish: (wish: WishDTO) => Promise<void>;
}

export const Wish: React.FC<Props> = ({ wish, deleteWish }: Props) => {
  const [showDeleteWishModal, setShowDeleteWishModal] = useState<boolean>(false);
  return (
    <span>
      <DeleteWishModal
        wish={wish}
        show={showDeleteWishModal}
        onCloseModal={async shouldDeleteWish => {
          if (shouldDeleteWish) {
            await deleteWish(wish);
          } else {
            setShowDeleteWishModal(false);
          }
        }}
      />
      <ListGroupItem>
        <Row>
          <Col>{wish.title}</Col>
          <DeleteColumn>
            <DeleteButton
              aria-label={'delete'}
              onClick={() => {
                setShowDeleteWishModal(true);
              }}
            >
              <TrashIcon />
            </DeleteButton>
          </DeleteColumn>
        </Row>
      </ListGroupItem>
    </span>
  );
};

const DeleteColumn = styled(Col)`
  text-align: right;
  justify-content: center;
  align-self: center;
`;

const DeleteButton = styled.button`
  border: 0;
  background: transparent;
`;

const TrashIcon = styled(Trash)`
  display: none;
`;

const ListGroupItem = styled(ListGroup.Item)`
  &:hover ${TrashIcon} {
    display: inline;
  }
`;
