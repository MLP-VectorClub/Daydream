import { InlineIconProps } from './component-props';

export enum AuthModalSide {
  SIGN_IN,
  REGISTER,
  PASSWORD_RESET
}

export interface SocialProviderConfig {
  name: string;
  renderIcon: (props: Omit<InlineIconProps, 'icon'>) => JSX.Element;
}
