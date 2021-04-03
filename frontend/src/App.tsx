import React from 'react';
import { LoginContainer } from './login/LoginContainer';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
});

export const App: React.FC = () => <LoginContainer />;
