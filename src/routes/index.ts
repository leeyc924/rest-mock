import express, { Router } from 'express';
import asyncify from 'express-asyncify';

import accountRouter from './account';

const router: Router = asyncify(express.Router());

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const originalUrl = req.originalUrl;

    next();
  } catch (err) {
    res.status(401).send();
  }
});

router.use('/account', accountRouter);

router.post('/*', async (req: express.Request, res: express.Response) => {
  res.status(500).send();
});

export default router;
