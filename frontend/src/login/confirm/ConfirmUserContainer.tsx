import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import { UseProvideAuthType } from '../../common/auth/UseProvideAuth';
import { useAuth } from '../../common/auth/ProvideAuth';
import { UserAuthState } from '../../common/auth/type/UserAuthState';
import { ConfirmUserForm } from './ConfirmUserForm';
import { Redirect, useParams } from 'react-router-dom';

const handleConfirmUser = async (
  auth: UseProvideAuthType,
  username: string,
  code: string,
  setLoading: (loading: boolean) => void,
  setErrorMessage: (value: string) => void
) => {
  setLoading(true);
  try {
    await auth.confirmUser(username, code);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    setErrorMessage(error.message);
  }
};

interface Params {
  username?: string;
  code?: string;
}

export const ConfirmUserContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { username, code } = useParams<Params>();
  const auth = useAuth();

  useEffect(() => {
    const confirmUser = async () => {
      if (username && code) {
        await handleConfirmUser(auth, username, code, setLoading, setErrorMessage);
      }
    };
    confirmUser();
  }, [username, code]);

  if (auth.userAuthState === UserAuthState.CONFIRMED) {
    return <Redirect to={'/login'} />;
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
            <ConfirmUserForm
              presetUsername={username}
              presetCode={code}
              handleConfirmUser={(username, password) =>
                handleConfirmUser(auth, username, password, setLoading, setErrorMessage)
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
