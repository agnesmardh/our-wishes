import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { ErrorMessage } from '../common/Components';
import { LoginLoadingIndicator } from '../common/LoginLoadingIndicator';

interface Props {
  handleSignUp: (username: string, password: string, email: string, phoneNumber: string) => void;
  loading: boolean;
  errorMessage: string;
}

export const SignUpForm: React.FC<Props> = ({ handleSignUp, loading, errorMessage }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validated, setValidated] = useState(false);

  const passwordsMatch = password === confirmPassword || !password || !confirmPassword;

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
          handleSignUp(username, password, email, phoneNumber);
          event.preventDefault();
        }
      }}
    >
      {loading && <LoginLoadingIndicator />}
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          required
          onChange={event => setUsername(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a username.</Form.Control.Feedback>
        <Form.Text className="text-muted">The username is case sensitive</Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          onChange={event => setEmail(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="phone"
          placeholder="Enter Phone number"
          onChange={event => setPhoneNumber(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please provide a valid phone number address.</Form.Control.Feedback>
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
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          isInvalid={!passwordsMatch}
          onChange={event => setConfirmPassword(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">The passwords must match</Form.Control.Feedback>
      </Form.Group>
      {errorMessage && !loading && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button variant="primary" type="submit" disabled={loading}>
        Sign up
      </Button>
    </Form>
  );
};
