import React from 'react';
import { Amplify } from 'aws-amplify';
import { HomeContainer } from './home/HomeContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginContainer } from './login/LoginContainer';
import { ProvideAuth } from './common/auth/ProvideAuth';
import { PrivateRoute } from './common/auth/PrivateRoute';
import { SignUpContainer } from './login/SignUpContainer';
import { SignupSuccess } from './login/SignupSuccess';
import { ConfirmUserContainer } from './login/ConfirmUserContainer';

Amplify.configure({
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
});

export const App: React.FC = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/signup">
            <SignUpContainer />
          </Route>
          <Route path="/signup-success">
            <SignupSuccess email={'test@example.com'} />
          </Route>
          <Route path="/confirm/:username/:code">
            <ConfirmUserContainer />
          </Route>
          <PrivateRoute path="/">
            <HomeContainer />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};
