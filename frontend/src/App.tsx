import React from 'react';
import { Amplify } from 'aws-amplify';
import { WishlistsContainer } from './wishlists/WishlistsContainer';
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignUp,
  VerifyContact,
  withAuthenticator
} from 'aws-amplify-react';

import { LoginContainer } from './login/LoginContainer';

Amplify.configure({
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
});

const App: React.FC = () => <WishlistsContainer />;

export default withAuthenticator(App, false, [
  <LoginContainer key={1} />,
  <ConfirmSignIn key={2} />,
  <VerifyContact key={3} />,
  <SignUp key={4} />,
  <ConfirmSignUp key={5} />,
  <ForgotPassword key={6} />,
  <RequireNewPassword key={7} />
]);
