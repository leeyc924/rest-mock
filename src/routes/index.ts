import express, { NextFunction, Request, Response, Router } from 'express';
import asyncify from 'express-asyncify';

const router: Router = asyncify(express.Router());

router.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const originalUrl = req.originalUrl;

    next();
  } catch (err) {
    res.status(401).send();
  }
});

router.post('/*', async (req: Request, res: Response) => {
  res.status(500).send();
});

export default router;
