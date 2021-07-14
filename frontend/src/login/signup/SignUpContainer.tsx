import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import { SignUpForm } from './SignUpForm';
import { UseProvideAuthType } from '../../common/auth/UseProvideAuth';
import { useAuth } from '../../common/auth/ProvideAuth';
import { UserAuthState } from '../../common/auth/type/UserAuthState';
import { Redirect } from 'react-router-dom';

const handleSignUp = async (
  auth: UseProvideAuthType,
  username: string,
  password: string,
  email: string,
  phoneNumber: string,
  setLoading: (loading: boolean) => void,
  setErrorMessage: (value: string) => void
) => {
  setLoading(true);
  try {
    await auth.signUp(username, password, email, phoneNumber);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    setErrorMessage(error.message);
  }
};

export const SignUpContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();

  if (auth.userAuthState === UserAuthState.UNCONFIRMED) {
    return <Redirect to={'/signup-success'} />;
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
            <SignUpForm
              handleSignUp={(username, password, email, phoneNumber) =>
                handleSignUp(auth, username, password, email, phoneNumber, setLoading, setErrorMessage)
              }
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
