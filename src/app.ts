import express from 'express';
import cors from 'cors';
import router from './router';

function configureApp() {
  const app = express();
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));
  app.use(cors());

  app.use('/api', router);

  app.use(function (req, res) {
    res.status(500).json({ message: 'Invalid Path' });
  });

  return app;
}

export default configureApp;