process.env.TZ = 'Asia/Seoul';

import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { Context } from 'aws-lambda';
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
app.use(eventContext());
const server = createServer(app, undefined, binaryMimeTypes);
export const handler = (event: any, context: Context) =>
  proxy(server, event, context);
