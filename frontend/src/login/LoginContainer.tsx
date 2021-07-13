import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UseProvideAuthType } from '../common/auth/UseProvideAuth';
import { useAuth } from '../common/auth/ProvideAuth';

const handleLogin = async (
  auth: UseProvideAuthType,
  username: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setErrorMessage: (value: string) => void
) => {
  setLoading(true);
  try {
    console.log('Sign in');
    await auth.signIn(username, password);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setErrorMessage('Incorrect username or password.');
  }
};

export const LoginContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Row>
        <Col>
          <CenteredHeader>Welcome to Our Wishes</CenteredHeader>
        </Col>
      </Row>
      <VerticallyCenteredRow>
        <Col sm />
        <Col sm>
          <LoginContainerWithMargin>
            <LoginForm
              handleLogin={(username, password) => handleLogin(auth, username, password, setLoading, setErrorMessage)}
              loading={loading}
              errorMessage={errorMessage}
            />
          </LoginContainerWithMargin>
        </Col>
        <Col sm />
      </VerticallyCenteredRow>
    </>
  );
};

const CenteredHeader = styled.h1`
  margin-top: 1vh;
  text-align: center;
`;

const VerticallyCenteredRow = styled(Row)`
  height: 70vh;
  align-items: center;
`;

const LoginContainerWithMargin = styled.div`
  margin-left: 1vh;
  margin-right: 1vh;
`;
