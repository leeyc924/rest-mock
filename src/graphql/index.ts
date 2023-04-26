import { graphqlHTTP } from 'express-graphql';
import { graphql, buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
export const root = {
  hello: () => {
    return "Hello world!"
  },
};

export const gqlHTTP = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});