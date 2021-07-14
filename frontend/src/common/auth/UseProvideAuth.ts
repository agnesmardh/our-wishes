import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { userIsAuthenticated } from './AuthUtil';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { UserAuthState } from './type/UserAuthState';

export type UseProvideAuthType = {
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, email: string, phoneNumber: string) => Promise<ISignUpResult>;
  signOut: () => Promise<void>;
  userAuthState: UserAuthState;
  isAuthenticated?: boolean;
};

export const useProvideAuth = (): UseProvideAuthType => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>(UserAuthState.LOGGED_OUT);
  useEffect(() => {
    const fetchIsAuthenticated = async () => {
      if (await userIsAuthenticated()) {
        setUserAuthState(UserAuthState.AUTHENTICATED);
      } else {
        setUserAuthState(UserAuthState.LOGGED_OUT);
      }
    };
    fetchIsAuthenticated();
  });

  const signIn = async (username: string, password: string) => {
    try {
      const user = await Auth.signIn(username, password);
      if (user) {
        setUserAuthState(UserAuthState.AUTHENTICATED);
      }
      return user;
    } catch (e) {
      setUserAuthState(UserAuthState.LOGGED_OUT);
      throw e;
    }
  };

  const signOut = async () => {
    await Auth.signOut();
    setUserAuthState(UserAuthState.LOGGED_OUT);
  };

  const signUp = async (
    username: string,
    password: string,
    email: string,
    phoneNumber: string
  ): Promise<ISignUpResult> => {
    try {
      const signUpResult = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: phoneNumber
        }
      });
      console.log(signUpResult.user);
      setUserAuthState(UserAuthState.UNCONFIRMED);
      return signUpResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    userAuthState,
    isAuthenticated: userAuthState === UserAuthState.AUTHENTICATED
  };
};
