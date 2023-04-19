import express, { NextFunction, Request, Response, Router } from 'express';
import cafeRouter from './cafe';

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(403).json(error);
  }
});

router.use('/cafe', cafeRouter);

router.post('/*', async (req, res) => {
  res.status(500).send();
});

export default router;
