const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

// MongoDB connected
mongoose.connect("mongodb://localhost/graphql_full_course");
mongoose.connection.once('open', () => {
	console.log('MongodDB connected!');
});

// GraphQL route
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const port = 5000;

app.listen(port, () => {
	console.log(`now listening for request on port ${port}`);
});