import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { WishDTO } from '../types/WishDTO';

interface Props {
  wish: WishDTO;
  onCloseModal: (shouldDeleteWish: boolean) => void;
  show: boolean;
}

export const DeleteWishModal: React.FC<Props> = ({ wish, show, onCloseModal }: Props) => {
  return (
    <Modal show={show} onHide={() => onCloseModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Wish</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete the following wish?</p>
        <p>{wish.title}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCloseModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onCloseModal(true)}>
          Delete Wish
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
