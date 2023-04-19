import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();
const port = process.env.PORT || 8005;

const app = express();
app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
app.use(express.json({ limit: '30mb' }));

app.use(cors());

app.use('/mock', router);

app.use(function (req, res) {
  res.status(500).json({ message: 'Invalid Path' });
});

app.listen(port, () => {
  console.log('Express is listening on port', port);
});
