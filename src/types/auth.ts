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
