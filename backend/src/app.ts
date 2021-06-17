process.env.JWT_SECRET = 'ELIGA-STORE-API-20210607-SSB-CREATED';

import express from 'express';
import asyncify from 'express-asyncify';
import cors from 'cors';

import router from './routes/index';

export function configureApp() {
  const app = asyncify(express());
  app.use(cors());
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));

  app.use('/store', router);

  app.use(function (req: express.Request, res: express.Response) {
    res.status(500).json({ message: 'Invalid Path' });
  });

  return app;
}
