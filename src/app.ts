import express from 'express';
import asyncify from 'express-asyncify';

import router from './routes/index';

export function configureApp() {
  const app = asyncify(express());
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));

  app.use('/editor', router);

  app.use(function (req: express.Request, res: express.Response) {
    res.status(500).json({ message: 'Invalid Path' });
  });

  return app;
}
