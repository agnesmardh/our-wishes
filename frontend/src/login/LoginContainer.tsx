import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

const handleLogin = async (
  username: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setErrorMessage: (value: string) => void
) => {
  setLoading(true);
  try {
    await Auth.signIn(username, password);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setErrorMessage('Incorrect username or password.');
  }
};

export const LoginContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <CenteredLoginContainer>
      <LoginForm
        handleLogin={(username, password) => handleLogin(username, password, setLoading, setErrorMessage)}
        loading={loading}
        errorMessage={errorMessage}
      />
    </CenteredLoginContainer>
  );
};

const CenteredLoginContainer = styled.div`
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 50%;
  min-width: 200px;
  max-width: 400px;
  padding: 40px;
`;
