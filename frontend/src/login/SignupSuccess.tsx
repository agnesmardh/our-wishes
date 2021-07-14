import React from 'react';
import { Check2Circle } from 'react-bootstrap-icons';

interface Props {
  email: string;
}

export const SignupSuccess: React.FC<Props> = ({ email }: Props) => {
  return (
    <>
      <Check2Circle />
      You have successfully signed up for Our Wishes! Please check the email you provided ({email}) for a verification
      email.
    </>
  );
};
