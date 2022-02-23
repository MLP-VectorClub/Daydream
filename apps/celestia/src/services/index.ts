import { UserService } from 'src/services/user';
import { CoreService } from 'src/services/core';
import { ColorGuideService } from 'src/services/color-guide';
import { AboutService } from 'src/services/about';
import { IncomingMessage } from 'http';
import { ShowService } from 'src/services/show';

export { AboutService, UserService, CoreService, ColorGuideService, ShowService };

export interface AppServices {
  about: AboutService;
  user: UserService;
  core: CoreService;
  colorGuide: ColorGuideService;
  show: ShowService;
}

export const buildServices = (req?: IncomingMessage): AppServices => ({
  about: new AboutService(req),
  user: new UserService(req),
  core: new CoreService(req),
  colorGuide: new ColorGuideService(req),
  show: new ShowService(req),
});

export const defaultServices: AppServices = buildServices();
