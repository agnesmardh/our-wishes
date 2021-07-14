import { Button, Form, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  handleConfirmUser: (username: string, code: string) => void;
  presetUsername?: string;
  presetCode?: string;
  loading: boolean;
  errorMessage: string;
}

export const ConfirmUserForm: React.FC<Props> = ({
  handleConfirmUser,
  presetUsername,
  presetCode,
  loading,
  errorMessage
}: Props) => {
  const [username, setUsername] = useState(presetUsername ?? '');
  const [code, setCode] = useState(presetCode ?? '');
  const [validated, setValidated] = useState(false);

  return (
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
          handleConfirmUser(username, code);
          event.preventDefault();
        }
      }}
    >
      {loading && (
        <CenteredSpinner>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </CenteredSpinner>
      )}
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          required
          defaultValue={presetUsername}
          onChange={event => setUsername(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a username.</Form.Control.Feedback>
        <Form.Text className="text-muted">The username is case sensitive</Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Code"
          required
          defaultValue={presetCode}
          onChange={event => setCode(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a valid code</Form.Control.Feedback>
      </Form.Group>
      {errorMessage && !loading && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button variant="primary" type="submit" disabled={loading}>
        Confirm Email
      </Button>
    </Form>
  );
};

const ErrorMessage = styled.p`
  color: red;
`;

const CenteredSpinner = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  opacity: 0.5;
  transform: translate(-50%, -50%);
`;
