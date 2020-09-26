const withPlugins = require('next-compose-plugins');
const withESLint = require('./utils/next-eslint');
const withI18n = require('./utils/next-i18n');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
module.exports = withPlugins(
  [
    [withESLint],
    [withI18n],
  ],
  {
    useFileSystemPublicRoutes: false,
    generateBuildId: async () => {
      const { stdout } = await execFile('git', ['log', '-1', '--date=short', '--pretty=%h;%ct']);
      const buildId = stdout.trim();
      console.log(`Generated build ID: ${buildId}`);
      return buildId;
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: `/cg`,
          permanent: false,
        },
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
        // we need to define a no-op rewrite to trigger checking
        // all pages/static files before we attempt proxying
        {
          source: '/:path*',
          destination: '/:path*',
        },
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_HOST}/:path*`,
        },
      ];
    },
  },
);
