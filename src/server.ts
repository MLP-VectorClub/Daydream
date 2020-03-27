/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('console-stamp')(console, {
  format: ':date(yyyy-mm-dd HH:MM:ss.l) :label',
});

import https from 'https';
import http from 'http';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import nextI18NextMiddleware from 'next-i18next/middleware';
import cookieParser from 'cookie-parser';
import * as es6Promise from 'es6-promise';
import 'isomorphic-fetch';
import { createProxyMiddleware } from 'http-proxy-middleware';
import nextI18next from './i18n';

dotenv.config();

es6Promise.polyfill();

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { applyServerHMR } = require('i18next-hmr/server');
  applyServerHMR(nextI18next.i18n);
}

interface AppEnvironment {
  NODE_ENV: string;
  APP_PORT: string;
  APP_HOST: string;
  SSL_KEY_PATH: string;
  SSL_CERT_PATH: string;
}

const {
  NODE_ENV,
  APP_PORT,
  APP_HOST,
  SSL_KEY_PATH,
  SSL_CERT_PATH,
} = process.env as Partial<AppEnvironment>;

const dev = NODE_ENV !== 'production';
const protocol = dev ? 'https' : 'http';
const app = next({ dev, customServer: true });
const handle = app.getRequestHandler();

if (
  dev && (
    !SSL_CERT_PATH || !SSL_KEY_PATH
    || !fs.existsSync(SSL_CERT_PATH) || !fs.existsSync(SSL_KEY_PATH)
  )
) {
  console.error('Make sure to specify the HTTPS environment variables pointing to the desired certificate files');
  process.exit(1);
}

(async () => {
  await app.prepare();
  const expressApp = express();

  await nextI18next.initPromise;
  expressApp.use(nextI18NextMiddleware(nextI18next));

  expressApp.use(cookieParser());

  expressApp.get('/', (_req, res) => res.redirect('/cg', 302));
  expressApp.get('/cg', (req, res) => app.render(req, res, '/color-guide', req.query));
  expressApp.get('/about', (req, res) => app.render(req, res, '/about', req.query));

  // Development Backend proxy
  if (dev) {
    expressApp.use(createProxyMiddleware('/api', {
      target: `http://api.mlpvector.lc`,
      pathRewrite: { '^/api': '/' },
      changeOrigin: true,
    }));
  }

  expressApp.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);

    return handle(req, res, parsedUrl);
  });

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
