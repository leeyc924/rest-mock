import express from 'express';
import asyncify from 'express-asyncify';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';

import { connectMongoDb } from './database/connection';

import router from './routes/index';

import { schema, rootValue } from './graphql/index';

export function configureApp() {
  connectMongoDb();

  const app = asyncify(express());
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));

  app.use(cors());

  app.use('/graphql', cors(), graphqlHTTP((requset) => {
    return {
      schema: schema,
      rootValue: rootValue,
      graphiql: true
    }
  }));

  app.use('/editor', router);

  app.use(function (req: express.Request, res: express.Response) {
    res.status(500).json({ message: 'Invalid Path' });
  });

  return app;
}
