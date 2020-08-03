import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as i18nextHmr from 'i18next-hmr/server';
import { i18n } from './i18n';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

i18nextHmr.applyServerHMR(i18n);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  // eslint-disable-next-line no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  );
});
