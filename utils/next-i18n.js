const path = require('path');
const { I18NextHMRPlugin } = require('i18next-hmr/plugin');
module.exports = (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config, options) {

    if (!options.plugins) {
      options.plugins = [];
    }

    options.plugins.push(new I18NextHMRPlugin({
      localesDir: path.resolve(__dirname, '../public/static/locales'),
    }));

    if (typeof nextConfig.webpack === 'function'){
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});
