import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { userIsAuthenticated } from './AuthUtil';

export type UseProvideAuthType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated?: boolean;
};

export const useProvideAuth = (): UseProvideAuthType => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const fetchIsAuthenticated = async () => {
      setIsAuthenticated(await userIsAuthenticated());
    };
    fetchIsAuthenticated();
  });

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Auth.signin');
      const user = await Auth.signIn(email, password);
      if (user) {
        console.log('isAuthenticated = true');
        setIsAuthenticated(true);
      }
      return user;
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const signOut = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
  };

  return {
    signIn,
    signOut,
    isAuthenticated
  };
};
