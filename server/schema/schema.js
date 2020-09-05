const graphql = require('graphql');
const _ = require('lodash');


const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
	{name: 'Name of the Wind', genra: 'Fantasy', id: '1'},
	{name: 'The Final Empire', genra: 'Fantasy', id: '2'},
	{name: 'The Long Earth', genra: 'Sci-Fi', id: '3'}, 
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		genra: {
			type: GraphQLString
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { 
				id: {
					type: GraphQLString
				}
			},
			resolve(parent, args)  {
				// code to get data from db / other source
				return _.find(books, { id: args.id });
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
})