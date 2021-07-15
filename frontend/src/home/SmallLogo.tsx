import React from 'react';
import Logo from '../assets/logo-small.svg';

export const SmallLogo: React.FC = () => {
  return <img src={Logo} alt="logo" width={42} height={42} />;
};
