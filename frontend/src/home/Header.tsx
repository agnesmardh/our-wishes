import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../common/auth/ProvideAuth';

export const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Our Wishes</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto" />
      <Form inline>
        <Button variant="outline-success" onClick={async () => await signOut()}>
          Sign out
        </Button>
      </Form>
    </Navbar>
  );
};
