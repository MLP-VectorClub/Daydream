const { NEXT_PUBLIC_CDN_DOMAIN, NEXT_PUBLIC_BACKEND_HOST } = process.env;
const withPlugins = require('next-compose-plugins');
const withESLint = require('./utils/next-eslint');
const withCamelCaseCSSModules = require('./utils/next-css-modules');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
module.exports = withPlugins(
  [
    [withESLint],
    [withCamelCaseCSSModules],
  ],
  {
    useFileSystemPublicRoutes: false,
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
      domains: [NEXT_PUBLIC_CDN_DOMAIN],
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
          source: '/',
          destination: '/',
        },
        // we need to define a no-op rewrite to trigger checking
        // all pages/static files before we attempt proxying
        {
          source: '/:path*',
          destination: '/:path*',
        },
        {
          source: '/api/:path*',
          destination: `${NEXT_PUBLIC_BACKEND_HOST}/:path*`,
        },
      ];
    },
  },
);
