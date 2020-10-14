import { OAuthErrorTypes } from 'src/types';

export const oauth = {
  authTitle: '{{provider}} OAuth 2.0 Authentication',
  creatingSession: 'Creating session',
  loadingUserData: 'Loading profile data',
  welcome: 'Welcome {{name}}!',
  close: 'Dismiss',
  unknownError: 'There was an unknown error while authenticating, please try again later.',
  errorTypes: {
    [OAuthErrorTypes.AccessDenied]: 'Access Denied',
    [OAuthErrorTypes.UnknownError]: 'Unknown Error',
    [OAuthErrorTypes.ServerError]: 'Server Error',
  },
};
