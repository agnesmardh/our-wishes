import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { CreateWishlistDTO } from '../types/CreateWishlistDTO';

interface Props {
  onCloseModal: (createWishlistDTO: CreateWishlistDTO, shouldCreateWishlist: boolean) => void;
  show: boolean;
}

export const CreateWishlistModal: React.FC<Props> = ({ show, onCloseModal }: Props) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [deadline, setDeadline] = useState<Date>(new Date());

  const createWishlistDTO: CreateWishlistDTO = {
    title,
    deadline
  };

  return (
    <Modal show={show} onHide={() => onCloseModal(createWishlistDTO, false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Wishlist</Modal.Title>
      </Modal.Header>
      <Form
        noValidate
        validated={validated}
        onSubmit={event => {
          setValidated(false);
          if (!event.currentTarget.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
          } else {
            onCloseModal(createWishlistDTO, true);
            event.preventDefault();
          }
        }}
      >
        <Modal.Body>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Name/Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter the name of the wishlist"
              required
              onChange={event => setTitle(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please provide a title for the wishlist</Form.Control.Feedback>
            <Form.Text className="text-muted">The name of the wishlist, for example Christmas 2021</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control type="date" onChange={event => setDeadline(new Date(event.target.value))} />
            <Form.Control.Feedback type="invalid">Please provide a deadline for the wishlist</Form.Control.Feedback>
            <Form.Text className="text-muted">The deadline is when the gifts are expected to be received.</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onCloseModal(createWishlistDTO, false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Wishlist
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
