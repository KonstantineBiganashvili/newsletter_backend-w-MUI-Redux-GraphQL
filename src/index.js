const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema.js');
const port = 5000;
const connectDB = require('./db/db');

const app = express();

connectDB.authenticate().then(console.log('Connection established!'));

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port);
