import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as i18nextHmr from 'i18next-hmr/server';
import { i18n } from 'src/i18n';

interface AppEnvironment {
  NODE_ENV: string;
  PORT: string;
  HOST: string;
  SSL_KEY_PATH: string;
  SSL_CERT_PATH: string;
  API_JSON_PATH: string;
  BACKEND_HOST: string;
}

dotenv.config({ path: '.env.local' });

const {
  NODE_ENV = 'development',
  SSL_KEY_PATH,
  SSL_CERT_PATH,
  PORT,
  HOST,
} = process.env as Partial<AppEnvironment>;

const port = parseInt(PORT || '3000', 10);
const host = HOST || '127.0.0.1';
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// TODO Figure out why changed language does not persist when app is deployed
i18nextHmr.applyServerHMR(i18n);

if (
  !SSL_CERT_PATH || !SSL_KEY_PATH
  || !fs.existsSync(SSL_CERT_PATH) || !fs.existsSync(SSL_KEY_PATH)
) {
  console.error('Make sure to specify the HTTPS environment variables pointing to the desired certificate files');
  process.exit(1);
}

app.prepare().then(() => {
  createServer({
    key: fs.readFileSync(SSL_KEY_PATH as string),
    cert: fs.readFileSync(SSL_CERT_PATH as string),
  }, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port, host);

  // eslint-disable-next-line no-console
  console.log(`> Server listening at https://${host}:${port}`);
});
