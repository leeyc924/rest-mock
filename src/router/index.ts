import express from 'express';
import cafeRouter from './cafe';
import todoRouter from './todo';

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(403).json(error);
  }
});

router.use('/cafe', cafeRouter);
router.use('/todo', todoRouter);

router.post('/*', async (req, res) => {
  res.status(500).send();
});

export default router;
