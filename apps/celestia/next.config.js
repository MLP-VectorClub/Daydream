/* eslint-disable @typescript-eslint/no-var-requires -- require is required */
const { NEXT_PUBLIC_CDN_DOMAIN, NEXT_PUBLIC_BACKEND_HOST, NEXT_PUBLIC_API_PREFIX } = process.env;
const { platform } = require('os');
const { i18n } = require('./next-i18next.config.js');
const withPlugins = require('next-compose-plugins');
const withCamelCaseCSSModules = require('./utils/next-css-modules');
const withTM = require('next-transpile-modules')(['@mlp-vectorclub/ui']);
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const vercelConfig = require('./vercel.json');
/* eslint-enable @typescript-eslint/no-var-requires */

const devMode = process.env.NODE_ENV === 'development';

module.exports = withPlugins(
  [
    [withCamelCaseCSSModules],
    [
      withTM,
      {
        reactStrictMode: true,
      },
    ],
  ],
  {
    i18n,
    generateBuildId: async () => {
      try {
        const gitArgs = ['log', '-1', '--date=short', '--pretty=%h;%ct'];
        const { stdout } = await (platform() === 'win32' ? execFile('git', gitArgs) : execFile('env', ['-i', 'git', ...gitArgs]));
        const buildId = stdout.trim();
        console.log(`Generated build ID: ${buildId}`);
        return buildId;
      } catch (e) {
        const buildId = `;${Math.floor(Date.now())}`;
        console.log(`Failed to generate build id, falling back to dummy value: ${buildId}`);
        console.error(e);
        return buildId;
      }
    },
    images: {
      domains: [NEXT_PUBLIC_CDN_DOMAIN, 'a.deviantart.net'],
    },
    async headers() {
      return vercelConfig.headers.reduce((acc, config) => {
        // Allow all scripts in development mode
        if (devMode) {
          config.headers = config.headers.map((headerConfig) => {
            if (/content-security-policy/i.test(headerConfig.key)) {
              const value = headerConfig.value
                .replace(/script-src [^;]+(;|$)/, `script-src * 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval'$1`)
                .replace(/((?:img|default)-src [^;]+)(;|$)/g, `$1 ${NEXT_PUBLIC_CDN_DOMAIN}$2`);
              return {
                ...headerConfig,
                value,
              };
            }

            return headerConfig;
          });
        }

        if (config.source === '/(.*)') {
          acc.push({
            ...config,
            source: '/:path*',
          });
          acc.push({
            ...config,
            source: '/',
          });
        } else {
          acc.push(config);
        }
        return acc;
      }, []);
    },
    async redirects() {
      return vercelConfig.redirects;
    },
    async rewrites() {
      return vercelConfig.rewrites.map((rewrite) =>
        rewrite.source === `${NEXT_PUBLIC_API_PREFIX}/:path*`
          ? {
              ...rewrite,
              destination: `${NEXT_PUBLIC_BACKEND_HOST}/:path*`,
            }
          : rewrite
      );
    },
  }
);
