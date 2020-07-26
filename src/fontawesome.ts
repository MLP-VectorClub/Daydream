import {
  config,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faBars,
  faCheck,
  faCircleNotch,
  faExternalLinkAlt,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faInfo,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's being imported
config.autoAddCss = false;

// List of used icons - amend if new icons are needed
library.add(
  fab,
  faEye,
  faInfo,
  faBars,
  faCheck,
  faTimes,
  faArrowUp,
  faEyeSlash,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCircleNotch,
  faExternalLinkAlt,
);
