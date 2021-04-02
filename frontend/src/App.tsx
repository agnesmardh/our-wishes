import React from 'react';
import { LoginContainer } from './login/LoginContainer';
import { Amplify } from 'aws-amplify';
import awsConfig from './config/aws-config';

Amplify.configure({
  aws_cognito_region: awsConfig.cognito.REGION,
  aws_user_pools_id: awsConfig.cognito.USER_POOL_ID,
  aws_user_pools_web_client_id: awsConfig.cognito.APP_CLIENT_ID
});

export const App: React.FC = () => <LoginContainer />;
