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
  },
);
