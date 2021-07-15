import React, { useEffect, useState } from 'react';
import { UseProvideAuthType } from '../../common/auth/UseProvideAuth';
import { useAuth } from '../../common/auth/ProvideAuth';
import { UserAuthState } from '../../common/auth/type/UserAuthState';
import { ConfirmUserForm } from './ConfirmUserForm';
import { Redirect, useParams } from 'react-router-dom';
import { AuthFormWrapper } from '../common/AuthFormWrapper';

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
    <AuthFormWrapper>
      <ConfirmUserForm
        presetUsername={username}
        presetCode={code}
        handleConfirmUser={(username, password) =>
          handleConfirmUser(auth, username, password, setLoading, setErrorMessage)
        }
        loading={loading}
        errorMessage={errorMessage}
      />
    </AuthFormWrapper>
  );
};
