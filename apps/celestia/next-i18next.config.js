// eslint-disable-next-line @typescript-eslint/no-var-requires -- require is required
const path = require('path');

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  localePath: path.resolve(path.join(__dirname, 'public', 'locales')),
};
