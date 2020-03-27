const path = require('path');
const { I18NextHMRPlugin } = require('i18next-hmr/plugin');
module.exports = (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config, options) {

    if (!options.plugins) {
      options.plugins = [];
    }

    const localesDir = path.resolve(__dirname, '../public/static/locales');

    console.log(`Initialized next-i18next webpack plugin with localesDir: ${localesDir}`);

    options.plugins.push(new I18NextHMRPlugin({
      localesDir: path.resolve(__dirname, '../public/static/locales'),
    }));

    if (typeof nextConfig.webpack === 'function'){
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});
