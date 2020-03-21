const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const output = (await exec('git log -1 --date=short  --pretty="format:%h;%ct"')).stdout.toString();
  const [id, timeInSeconds] = output.trim().split(';');
  return { id, time: new Date(timeInSeconds * 1e3) };
};
