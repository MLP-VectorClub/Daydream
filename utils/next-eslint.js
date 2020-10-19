const ESLintPlugin = require('eslint-webpack-plugin');
// https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
module.exports = {
  webpack(config, { dev }) {
    if (!dev) {
      config.plugins.push(new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        emitError: true,
        emitWarning: true,
        failOnError: true,
        failOnWarning: true,
      }));
    }

    return config;
  },
};
