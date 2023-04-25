import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { root, schema } from './graphql';

dotenv.config();
const port = process.env.PORT || 8005;

const app = express();
app.use(express.urlencoded({ limit: '30mb', extended: true, parameterLimit: 100000 }));
app.use(express.json({ limit: '30mb' }));
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.use('/mock', router);

app.use(function (req, res) {
  res.status(500).json({ message: 'Invalid Path' });
});

app.listen(port, () => {
  console.log('Express is listening on port', port);
});
function graphqlHTTP(arg0: {
  schema: any;
  rootValue: any;
  graphiql: boolean;
}): import('express-serve-static-core').RequestHandler<{}, any, any, import('qs').ParsedQs, Record<string, any>> {
  throw new Error('Function not implemented.');
}
