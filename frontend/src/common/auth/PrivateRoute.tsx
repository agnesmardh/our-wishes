import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './ProvideAuth';
import { CenteredLoadingIndicator } from '../components/loading-indicator/CenteredLoadingIndicator';

type Props = {
  children: ReactNode;
  path: string;
};

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }: Props) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <CenteredLoadingIndicator />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
