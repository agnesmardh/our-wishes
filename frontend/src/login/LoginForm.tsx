import { Button, Form, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  handleLogin: (username: string, password: string) => void;
  loading: boolean;
  errorMessage: string;
}

export const LoginForm: React.FC<Props> = ({ handleLogin, loading, errorMessage }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          handleLogin(username, password);
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
          onChange={event => setUsername(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a username.</Form.Control.Feedback>
        <Form.Text className="text-muted">Use the username you chose during the signup process.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          onChange={event => setPassword(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a password</Form.Control.Feedback>
      </Form.Group>
      {errorMessage && !loading && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button variant="primary" type="submit" disabled={loading}>
        Login
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
