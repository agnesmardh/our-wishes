import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

export const Header: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Our Wishes</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto" />
      <Form inline>
        <Button variant="outline-success" onClick={async () => await Auth.signOut()}>
          Sign out
        </Button>
      </Form>
    </Navbar>
  );
};
