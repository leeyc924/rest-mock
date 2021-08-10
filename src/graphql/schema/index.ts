import { SchemaComposer } from "graphql-compose";
import { AccountMutation, AccountQuery } from "./account";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...AccountQuery,
});

schemaComposer.Mutation.addFields({
  ...AccountMutation,
});

export default schemaComposer.buildSchema();

