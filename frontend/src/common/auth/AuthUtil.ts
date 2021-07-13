import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export const getAuthenticatedUser = async (): Promise<CognitoUserSession> => {
  return await Auth.currentSession();
};

export const userIsAuthenticated = async (): Promise<boolean> => {
  try {
    const authenticatedUser = await getAuthenticatedUser();
    return authenticatedUser !== undefined;
  } catch (e) {
    return false;
  }
};
