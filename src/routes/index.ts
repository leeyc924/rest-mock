import express from 'express';
import asyncify from 'express-asyncify';
import jwt from 'jsonwebtoken';
import AccountModel from '../database/models/account';

const router = asyncify(express.Router());

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const originalUrl = req.originalUrl;
    const aa = await AccountModel.AccountSchema.create({
      accountId: '11'
    });
    // if (originalUrl.indexOf('/editor/account') === 0) {
    //   next();
    //   return;
    // }
    res.json({resultFlag: true});
  } catch (err) {
    res.status(401).send();
  }
});

router.post('/*', async (req: express.Request, res: express.Response) => {
  res.status(500).send();
});

export default router;
