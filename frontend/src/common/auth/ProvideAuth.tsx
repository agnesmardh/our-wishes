import React, { createContext, ReactNode, useContext } from 'react';
import { useProvideAuth, UseProvideAuthType } from './UseProvideAuth';

type Props = {
  children: ReactNode;
};

const authContext = createContext<UseProvideAuthType>({} as UseProvideAuthType);

export const useAuth = (): UseProvideAuthType => {
  return useContext<UseProvideAuthType>(authContext);
};

export const ProvideAuth: React.FC<Props> = ({ children }: Props) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
