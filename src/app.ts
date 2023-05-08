import express from 'express';
import cors from 'cors';
import compression from 'compression';
import router from './router';

const app = express();
router.use(compression());
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use('/*', function (req, res) {
  res.status(500).json({ message: 'Invalid Path' });
});

export { app };
