import React, { useState } from 'react';
import { WishDTO } from '../types/WishDTO';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { DeleteWishModal } from './DeleteWishModal';

interface Props {
  wish: WishDTO;
}

const deleteWish = async (wish: WishDTO): Promise<void> => {
  console.log(`Deleting Wish: ${wish.id} (${wish.title})`);
  return Promise.resolve();
};

export const Wish: React.FC<Props> = ({ wish }: Props) => {
  const [showDeleteWishModal, setShowDeleteWishModal] = useState<boolean>(false);
  return (
    <span>
      <DeleteWishModal
        wish={wish}
        show={showDeleteWishModal}
        onCloseModal={async shouldDeleteWish => {
          if (shouldDeleteWish) {
            await deleteWish(wish);
          }
          setShowDeleteWishModal(false);
        }}
      />
      <ListGroupItem action>
        <Row>
          <Col>{wish.title}</Col>
          <DeleteColumn>
            <TrashIcon
              onClick={() => {
                setShowDeleteWishModal(true);
              }}
            />
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

const TrashIcon = styled(Trash)`
  display: none;
`;

const ListGroupItem = styled(ListGroup.Item)`
  &:hover ${TrashIcon} {
    display: inline;
  }
`;
