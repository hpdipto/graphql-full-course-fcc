const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const port = 5000;

app.listen(port, () => {
	console.log(`now listening for request on port ${port}`);
})