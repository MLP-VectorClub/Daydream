/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import Axios from 'axios-observable';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('console-stamp')(console, {
  format: ':date(yyyy-mm-dd HH:MM:ss.l) :label',
});

import https from 'https';
import http from 'http';
import next from 'next';
import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import nextI18NextMiddleware from 'next-i18next/middleware';
import cookieParser from 'cookie-parser';
import * as es6Promise from 'es6-promise';
import { createProxyMiddleware } from 'http-proxy-middleware';
import nextI18next,
{ i18n } from './i18n';
import routes from './routes';

dotenv.config();

es6Promise.polyfill();

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { applyServerHMR } = require('i18next-hmr/server');
  applyServerHMR(i18n);
}

interface AppEnvironment {
  NODE_ENV: string;
  APP_PORT: string;
  APP_HOST: string;
  SSL_KEY_PATH: string;
  SSL_CERT_PATH: string;
  API_JSON_PATH: string;
  BACKEND_HOST: string;
}

const {
  NODE_ENV,
  APP_PORT,
  APP_HOST,
  SSL_KEY_PATH,
  SSL_CERT_PATH,
  BACKEND_HOST,
} = process.env as Partial<AppEnvironment>;

const dev = NODE_ENV !== 'production';
const protocol = dev ? 'https' : 'http';
const app = next({ dev, customServer: true });
const handle = routes.getRequestHandler(app);

if (
  dev && (
    !SSL_CERT_PATH || !SSL_KEY_PATH
    || !fs.existsSync(SSL_CERT_PATH) || !fs.existsSync(SSL_KEY_PATH)
  )
) {
  console.error('Make sure to specify the HTTPS environment variables pointing to the desired certificate files');
  process.exit(1);
}

if (BACKEND_HOST) {
  Axios.defaults.baseURL = BACKEND_HOST;
}

(async () => {
  await app.prepare();
  const expressApp = express();

  await nextI18next.initPromise;
  expressApp.use(nextI18NextMiddleware(nextI18next));

  expressApp.use(cookieParser());

  expressApp.get('/', (_req, res) => res.redirect(302, '/cg'));
  expressApp.get('/cg', (_req, res) => res.redirect(302, '/cg/pony'));

  // Development Backend proxy
  if (dev) {
    expressApp.use(createProxyMiddleware('/api', {
      target: BACKEND_HOST,
      pathRewrite: { '^/api': '/' },
      changeOrigin: true,
    }));
  }

  expressApp.all('*', handle);

  let server;
  if (dev) {
    server = https.createServer({
      key: fs.readFileSync(SSL_KEY_PATH as string),
      cert: fs.readFileSync(SSL_CERT_PATH as string),
    }, expressApp);
  } else {
    server = http.createServer({}, expressApp);
  }

  server.listen(Number(APP_PORT), APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on ${protocol}://${APP_HOST}:${APP_PORT}`);
  });
})();
