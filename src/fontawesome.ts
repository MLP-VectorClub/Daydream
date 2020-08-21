import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faBars,
  faCheck,
  faCheckCircle,
  faCircleNotch,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faGlobe,
  faHardHat,
  faInfo,
  faSignInAlt,
  faSignOutAlt,
  faSync,
  faTimes,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's being imported
config.autoAddCss = false;

// List of used icons - amend if new icons are needed
library.add(
  fab,
  faEye,
  faInfo,
  faBars,
  faSync,
  faCheck,
  faGlobe,
  faTimes,
  faHardHat,
  faArrowUp,
  faEyeSlash,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCircleNotch,
  faCheckCircle,
  faExternalLinkAlt,
  faExclamationTriangle,
);
