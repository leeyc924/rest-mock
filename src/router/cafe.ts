import { categoryList, menuList } from '@@db';
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

router.post('/order', async (req, res) => {
  try {
    const menuList = req.body['menuList'] || [];
    if (menuList.length <= 0) {
      throw new Error("no menu");
    }
    res.json(true);
  } catch (error) {
    res.status(400).json({ message: 'eror' });
  }
});

export default router;
