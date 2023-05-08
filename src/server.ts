import { app } from './app';

const port = process.env.PORT || 8005;

app.listen(port, () => {
  console.log('Express is listening on port', port);
});
