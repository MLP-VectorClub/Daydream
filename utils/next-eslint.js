/*!
 * MIT License
 *
 * Copyright (c) 2018 Sayuti Daniel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const path = require('path');
module.exports = (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config, options) {
    if (!options.defaultLoaders){
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
      );
    }

    if (!options.isServer){
      const { eslintLoaderOptions } = nextConfig;
      options.defaultLoaders.eslint = {
        loader: 'eslint-loader',
        options: Object.assign({ failOnError: true }, eslintLoaderOptions),
      };

      config.module.rules.push({
        enforce: 'pre',
        test: /\.[jt]sx?$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
        use: options.defaultLoaders.eslint,
      });
    }

    if (typeof nextConfig.webpack === 'function'){
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});
