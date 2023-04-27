import { todoList } from '@@db';
import dayjs from 'dayjs';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todoItem = todoList.filter(t => t.id === req.query['id']);
    res.json(todoItem);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/list', async (req, res) => {
  try {
    res.json(todoList);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    res.json();
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch('/',async (req, res) => {
  try {
    res.json();
  } catch (error) {
    res.status(400).json(error);
  }
})

export default router;
