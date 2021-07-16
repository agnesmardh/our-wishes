import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { Redirect } from 'react-router-dom';
import { UseProvideAuthType } from '../../common/auth/UseProvideAuth';
import { useAuth } from '../../common/auth/ProvideAuth';
import { AuthFormWrapper } from '../common/AuthFormWrapper';

const handleLogin = async (
  auth: UseProvideAuthType,
  username: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setErrorMessage: (value: string) => void
) => {
  setLoading(true);
  try {
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

  if (auth.isAuthenticated && !loading) {
    return <Redirect to="/" />;
  }
  return (
    <AuthFormWrapper>
      <LoginForm
        handleLogin={(username, password) => handleLogin(auth, username, password, setLoading, setErrorMessage)}
        loading={loading}
        errorMessage={errorMessage}
      />
    </AuthFormWrapper>
  );
};
