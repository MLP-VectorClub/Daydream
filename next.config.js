const {
  NEXT_PUBLIC_CDN_DOMAIN,
  NEXT_PUBLIC_BACKEND_HOST,
} = process.env;
const withPlugins = require('next-compose-plugins');
const withESLint = require('./utils/next-eslint');
const withCamelCaseCSSModules = require('./utils/next-css-modules');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const vercelConfig = require('./vercel.json');

const devMode = process.env.NODE_ENV === 'development';

module.exports = withPlugins(
  [
    [withESLint],
    [withCamelCaseCSSModules],
  ],
  {
    generateBuildId: async () => {
      try {
        const { stdout } = await execFile('git', ['log', '-1', '--date=short', '--pretty=%h;%ct']);
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
      return [
        {
          source: '/colorguide/appearance/:path*',
          destination: `/cg/v/:path*`,
          permanent: true,
        },
        {
          source: '/colorguide/:path*',
          destination: `/cg/:path*`,
          permanent: true,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${NEXT_PUBLIC_BACKEND_HOST}/:path*`,
        },
      ];
    },
  },
);
