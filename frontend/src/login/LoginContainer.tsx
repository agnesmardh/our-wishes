import React from 'react';
import { LoginForm } from './LoginForm';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

const handleLogin = async (username: string, password: string) => {
  console.log('login', username, password);
  try {
    await Auth.signIn(username, password);
    console.log('success');
  } catch (error) {
    console.log('fail', error);
  }
};

export const LoginContainer: React.FC = () => {
  return (
    <CenteredLoginContainer>
      <LoginForm handleLogin={handleLogin} />
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
