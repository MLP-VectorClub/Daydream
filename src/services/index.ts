import { UserService } from 'src/services/user';
import { CoreService } from 'src/services/core';
import { ColorGuideService } from 'src/services/color-guide';
import { AboutService } from 'src/services/about';
import { IncomingMessage } from 'http';

export {
  AboutService,
  UserService,
  CoreService,
  ColorGuideService,
};

export interface AppServices {
  about: AboutService;
  user: UserService;
  core: CoreService;
  colorGuide: ColorGuideService;
}

export const buildServices = (req?: IncomingMessage): AppServices => ({
  about: new AboutService(req),
  user: new UserService(req),
  core: new CoreService(req),
  colorGuide: new ColorGuideService(req),
});

export const defaultServices: AppServices = buildServices();
