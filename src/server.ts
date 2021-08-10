import { configureApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8005;

configureApp().listen(port, () => {
  console.log('Express is listening on port', port);
})