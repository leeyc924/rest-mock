import express, { Request, Response } from 'express';
import asyncify from 'express-asyncify';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { connectMongoDb } from './database/connection';

import router from './routes/index';

import { schema, rootValue } from './graphql/index';

export function configureApp() {
  connectMongoDb();

  const app = asyncify(express());
  app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
  app.use(express.json({ limit: '30mb' }));

  app.use(cors());

  app.use('/graphql', async (req: Request, res: Response, next: Function) => {
    try {
      let accessToken = req.body.accessToken || req.query.accessToken || '';

      const decodedData = await new Promise((resolve, reject) => {
        jwt.verify(
          accessToken,
          process.env.JWT_SECRET || '',
          (
            err:
              | jwt.JsonWebTokenError
              | jwt.NotBeforeError
              | jwt.TokenExpiredError
              | null,
            decodedData: object | undefined,
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(decodedData);
            }
          },
        );
      });
      next();
    } catch (error) {
      res.status(401).send();
    }
  })

  app.use('/graphql', graphqlHTTP(() => {
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
