import React from 'react';
import { render } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import userEvent from '@testing-library/user-event';

describe('<LoginForm/>', () => {
  const renderLoginForm = (handleLogin: (username: string, password: string) => void) => {
    return render(<LoginForm handleLogin={handleLogin} />);
  };

  const handleLoginMock = jest.fn();

  beforeEach(() => {
    handleLoginMock.mockReset();
  });

  it('should render <LoginForm/> and match the snapshot', () => {
    const loginForm = renderLoginForm(handleLoginMock);
    expect(loginForm).toMatchSnapshot();
  });

  it('should call handleLogin with the provided username and password', () => {
    const loginForm = renderLoginForm(handleLoginMock);

    const usernameInput = loginForm.getByRole('textbox', { name: /username/i });
    userEvent.type(usernameInput, 'UserName');

    const passwordInput = loginForm.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'Password');

    const loginButton = loginForm.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(handleLoginMock).toHaveBeenCalledWith('UserName', 'Password');
  });

  it('should not call handleLogin if password is missing', () => {
    const loginForm = renderLoginForm(handleLoginMock);

    const usernameInput = loginForm.getByRole('textbox', { name: /username/i });
    userEvent.type(usernameInput, 'UserName');

    const loginButton = loginForm.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(handleLoginMock).toHaveBeenCalledTimes(0);
  });

  it('should not call handleLogin if username is missing', () => {
    const loginForm = renderLoginForm(handleLoginMock);

    const passwordInput = loginForm.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'Password');

    const loginButton = loginForm.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(handleLoginMock).toHaveBeenCalledTimes(0);
  });
});
