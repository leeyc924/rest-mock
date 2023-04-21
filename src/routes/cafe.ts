import { categoryList, menuList } from '@database';
import express from 'express';

const router = express.Router();

router.get('/category', async (req, res) => {
  try {
    res.json(categoryList);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/menu', async (req, res) => {
  try {
    const resMenuList = menuList.filter(m => m.categoryId === req.query['categoryId']);
    res.json(resMenuList);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
