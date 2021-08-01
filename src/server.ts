import { configureApp } from './app';

const port = process.env.PORT || 8005;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://leeyc:dudcjf12@editor.xwhv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(url)
  .then(client => {
    console.log('mongo connected');
    console.log(client);
  })
  .then(configureApp().listen(port, () => {
    console.log('Express is listening on port', port);
  }))
  .catch(err => console.log(err));

