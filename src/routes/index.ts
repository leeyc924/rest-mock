import express from 'express';
import asyncify from 'express-asyncify';
import jwt from 'jsonwebtoken';

const router = asyncify(express.Router());

router.use(async (req, res, next) => {
  try {
    next();
  } catch (err) {
    res.status(401).send();
  }
});

router.post('/*', async (req, res) => {
  res.status(500).send();
});

export default router;
