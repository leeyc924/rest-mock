process.env.TZ = 'Asia/Seoul';

import serverlessExpress from '@vendia/serverless-express';
import configureApp from './app';

const app = configureApp();
export const handler = serverlessExpress({ app });
