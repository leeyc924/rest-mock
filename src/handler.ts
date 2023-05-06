process.env.TZ = 'Asia/Seoul';

import serverless from 'serverless-http';
import configureApp from './app';

const binaryMimeTypes: string[] = [
  // 'application/javascript',
  // 'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  // 'text/css',
  // 'text/html',
  // 'text/javascript',
  // 'text/plain',
  'text/text',
  'text/xml',
];

const app = configureApp();
export const handler = serverless(app);
