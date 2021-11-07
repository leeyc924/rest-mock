import express, { Request, Response } from 'express';
import asyncify from 'express-asyncify';
import cors from 'cors';

import { connectMongoDb } from './database/connection';

import router from './routes/index';

export function configureApp() {
  connectMongoDb();

  const app = asyncify(express());
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));

  app.use(cors());

  app.use('/editor', router);

  app.use(function (req: Request, res: Response) {
    res.status(500).json({ message: 'Invalid Path' });
  });

  return app;
}
