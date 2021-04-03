import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';

interface Props {
  handleLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<Props> = ({ handleLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={event => {
        if (!event.currentTarget.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          handleLogin(username, password);
          event.preventDefault();
        }

        setValidated(true);
      }}
    >
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
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};
