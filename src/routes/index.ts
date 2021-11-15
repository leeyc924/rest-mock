import express, { NextFunction, Request, Response, Router } from 'express';
import asyncify from 'express-asyncify';
import jwt, { JwtPayload } from 'jsonwebtoken';

import accountRouter from './account';

const router: Router = asyncify(express.Router());

router.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const originalUrl = req.originalUrl;

    if (originalUrl.indexOf('/editor/account') === 0) {
      next();
      return;
    }

    const accessToken = req.headers.authorization;

    if (accessToken) {
      const decodedData: JwtPayload | undefined = await new Promise(
        (resolve, reject) => {
          jwt.verify(accessToken, process.env.JWT_SECRET || '', (err, decodedData) => {
            if (err) {
              reject(err);
            } else {
              resolve(decodedData);
            }
          });
        },
      );
    } else {
      throw new Error("token error");
    }

    next();
  } catch (error) {
    res.status(403).json(error);
  }
});

router.use('/account', accountRouter);

router.post('/*', async (req: Request, res: Response) => {
  res.status(500).send();
});

export default router;
