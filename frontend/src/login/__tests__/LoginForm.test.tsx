import React from 'react';
import { render } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import userEvent from '@testing-library/user-event';

describe('<LoginForm/>', () => {
  const renderLoginForm = (
    handleLogin: (username: string, password: string) => void,
    errorMessage: string,
    loading: boolean
  ) => {
    return render(<LoginForm handleLogin={handleLogin} errorMessage={errorMessage} loading={loading} />);
  };

  const handleLoginMock = jest.fn();

  beforeEach(() => {
    handleLoginMock.mockReset();
  });

  it('should render <LoginForm/> and match the snapshot', () => {
    const loginForm = renderLoginForm(handleLoginMock, '', false);
    expect(loginForm).toMatchSnapshot();
  });

  it('should call handleSignUp with the provided username and password', () => {
    const loginForm = renderLoginForm(handleLoginMock, '', false);

    const usernameInput = loginForm.getByRole('textbox', { name: /username/i });
    userEvent.type(usernameInput, 'UserName');

    const passwordInput = loginForm.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'Password');

    const loginButton = loginForm.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(handleLoginMock).toHaveBeenCalledWith('UserName', 'Password');
  });

  it('should not call handleSignUp if password is missing', () => {
    const loginForm = renderLoginForm(handleLoginMock, '', false);

    const usernameInput = loginForm.getByRole('textbox', { name: /username/i });
    userEvent.type(usernameInput, 'UserName');

    const loginButton = loginForm.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(handleLoginMock).toHaveBeenCalledTimes(0);
  });

  it('should not call handleSignUp if username is missing', () => {
    const loginForm = renderLoginForm(handleLoginMock, '', false);

    const passwordInput = loginForm.getByLabelText(/password/i);
    userEvent.type(passwordInput, 'Password');

    const loginButton = loginForm.getByRole('button', { name: /login/i });
    userEvent.click(loginButton);
    expect(handleLoginMock).toHaveBeenCalledTimes(0);
  });

  it('should have a disabled login button when loading is true', () => {
    const loginForm = renderLoginForm(handleLoginMock, '', true);
    const loginButton = loginForm.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it('should display an error message if it exists', () => {
    const loginForm = renderLoginForm(handleLoginMock, 'test error message', false);
    const errorMessage = loginForm.getByText(/test error message/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not display an error message if loading is true', () => {
    const loginForm = renderLoginForm(handleLoginMock, 'test error message', true);
    const errorMessage = loginForm.queryByText(/test error message/i);
    expect(errorMessage).toBeNull();
  });
});
