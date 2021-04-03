import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../Header';
import userEvent from '@testing-library/user-event';

import awsAmplify from 'aws-amplify';

jest.mock('aws-amplify');

describe('<Header/>', () => {
  const renderHeader = () => {
    return render(<Header />);
  };

  it('should render <Header/> and match the snapshot', () => {
    const header = renderHeader();
    expect(header).toMatchSnapshot();
  });

  it('should call Auth.signOut when signOut button is pressed', () => {
    const header = renderHeader();
    const signOutMock = jest.fn();
    awsAmplify.Auth.signOut = signOutMock;

    const signOutButton = header.getByRole('button', { name: /sign out/i });
    userEvent.click(signOutButton);
    expect(signOutMock).toHaveBeenCalledTimes(1);
  });
});
