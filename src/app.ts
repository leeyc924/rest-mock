import express from 'express';
import asyncify from 'express-asyncify';
import { connectMongoDb } from './database/connection';
import cors from 'cors';

import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './graphql/schema/index';

import router from './routes/index';

// TODO type에러 뜨는데 왜뜨는지 모르겠음
// const extensions = ({ context }) => {
//   return {
//     runTime: Date.now() - context.startTime,
//   };
// }

export function configureApp() {
  connectMongoDb();

  const app = asyncify(express());
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));

  app.use(cors());

  app.use('/graphql', cors(), graphqlHTTP((requset) => {
    return {
      // context: { startTime: Date.now() }, // TODO type에러 뜨는데 왜뜨는지 모르겠음
      schema: graphqlSchema,
      graphiql: true,
      // extensions,
    }
  }));

  app.use('/editor', router);

  app.use(function (req: express.Request, res: express.Response) {
    res.status(500).json({ message: 'Invalid Path' });
  });

  return app;
}
