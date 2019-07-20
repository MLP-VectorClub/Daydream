import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as bodyParser from 'body-parser';
import { environment } from 'environments/environment';

import * as express from 'express';
import * as httpProxy from 'http-proxy';
import { join } from 'path';
import 'zone.js/dist/zone-node';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

global['Event'] = null;

require('dotenv').config();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
  ],
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.use(bodyParser.json());

const proxy = httpProxy.createProxyServer({
  target: `https://${environment.backendDomain}`,
  followRedirects: true,
  secure: false,
});
proxy.on('proxyReq', (proxyReq) => {
  if (proxyReq.getHeader('host') !== environment.backendDomain)
    proxyReq.setHeader('host', environment.backendDomain);
});
app.all('/api/*', (req, res) => {
  proxy.web(req, res);
});

// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y',
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
