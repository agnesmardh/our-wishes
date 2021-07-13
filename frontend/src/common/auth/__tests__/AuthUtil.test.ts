import awsAmplify from 'aws-amplify';
import { userIsAuthenticated } from '../AuthUtil';

jest.mock('aws-amplify');

describe('authUtil', () => {
  describe('userIsAuthenticated', () => {
    it('should return true if Amplify current user returns a user', async () => {
      const currentSessionMock = jest.fn().mockResolvedValue({});
      awsAmplify.Auth.currentSession = currentSessionMock;

      const isAuthenticated = await userIsAuthenticated();
      expect(isAuthenticated).toBe(true);
      expect(currentSessionMock).toHaveBeenCalledTimes(1);
    });

    it('should return false if Amplify current user returns undefined', async () => {
      awsAmplify.Auth.currentSession = jest.fn().mockResolvedValue(undefined);

      const isAuthenticated = await userIsAuthenticated();
      expect(isAuthenticated).toBe(false);
    });

    it('should return false if Amplify current user throws an error', async () => {
      awsAmplify.Auth.currentSession = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      const isAuthenticated = await userIsAuthenticated();
      expect(isAuthenticated).toBe(false);
    });
  });
});
