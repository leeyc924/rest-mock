import express from 'express';
import asyncify from 'express-asyncify';

const router = asyncify(express.Router());

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const originalUrl = req.originalUrl;

    res.json({resultFlag: true});
  } catch (err) {
    res.status(401).send();
  }
});

router.post('/*', async (req: express.Request, res: express.Response) => {
  res.status(500).send();
});

export default router;
