import React, { useState } from 'react';
import { SignUpForm } from './SignUpForm';
import { UseProvideAuthType } from '../../common/auth/UseProvideAuth';
import { useAuth } from '../../common/auth/ProvideAuth';
import { UserAuthState } from '../../common/auth/type/UserAuthState';
import { Redirect } from 'react-router-dom';
import { AuthFormWrapper } from '../common/AuthFormWrapper';

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

  if (auth.userAuthState === UserAuthState.UNCONFIRMED && !loading) {
    return <Redirect to={'/signup-success'} />;
  }

  return (
    <AuthFormWrapper>
      <SignUpForm
        handleSignUp={(username, password, email, phoneNumber) =>
          handleSignUp(auth, username, password, email, phoneNumber, setLoading, setErrorMessage)
        }
        loading={loading}
        errorMessage={errorMessage}
      />
    </AuthFormWrapper>
  );
};
