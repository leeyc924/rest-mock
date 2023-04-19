import { CategoryName } from '@types';
import express from 'express';

const router = express.Router();

router.get('/category', async (req, res) => {
  try {
    const categoryName: CategoryName[] = ['coffee', 'latte', 'tea'];

    res.json(categoryName);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
