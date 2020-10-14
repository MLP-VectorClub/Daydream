import { InlineIconProps } from 'src/types/component-props';

export enum AuthModalSide {
  SIGN_IN,
  REGISTER,
  PASSWORD_RESET
}

export interface SocialProviderConfig {
  name: string;
  renderIcon: (props: Omit<InlineIconProps, 'icon'>) => JSX.Element;
}

export enum OAuthErrorTypes {
  AccessDenied = 'access_denied',
  UnknownError = 'unknown_error',
  ServerError = 'server_error',
}
