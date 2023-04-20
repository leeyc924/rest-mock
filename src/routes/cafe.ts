import { Category } from '@types';
import dayjs from 'dayjs';
import express from 'express';
import { v4 } from 'uuid';

const router = express.Router();

router.get('/category', async (req, res) => {
  try {
    const categoryList: Category[] = [
      {
        id: dayjs().unix() + v4().substring(0, 8),
        EnName: 'COFFEE',
        KrName: '커피',
      },
      {
        id: dayjs().unix() + v4().substring(0, 8),
        EnName: 'LATTE',
        KrName: '라떼',
      },
      {
        id: dayjs().unix() + v4().substring(0, 8),
        EnName: 'TEA',
        KrName: '차',
      },
    ];

    res.json(categoryList);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
