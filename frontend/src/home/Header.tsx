import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../common/auth/ProvideAuth';
import styled from 'styled-components';
import { SmallLogo } from './SmallLogo';
import { PersonCircle } from 'react-bootstrap-icons';

export const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <SmallLogo /> <HeaderBrandTitle>Our Wishes</HeaderBrandTitle>
      </Navbar.Brand>
      <Nav className="mr-auto" />
      <UserInfoContainer>
        <UserAvatar size={32} />
        <span>Username</span>
      </UserInfoContainer>
      <Form inline>
        <Button variant="outline-success" onClick={async () => await signOut()}>
          Sign out
        </Button>
      </Form>
    </Navbar>
  );
};

const HeaderBrandTitle = styled.span`
  font-family: PermanentMarker, serif;
  display: inline;
`;

const UserInfoContainer = styled.div`
  margin-right: 10px;
`;

const UserAvatar = styled(PersonCircle)`
  margin-right: 10px;
`;
