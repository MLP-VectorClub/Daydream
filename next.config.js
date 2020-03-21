const withESLint = require('./utils/next-eslint');
const withI18n = require('./utils/next-i18n');
const withSass = require('@zeit/next-sass');
module.exports = withSass(withI18n(withESLint({
  useFileSystemPublicRoutes: false,
  compress: false,
})));
