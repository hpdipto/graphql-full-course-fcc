const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/Book');
const Author = require('../models/Author');

const { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLID
} = graphql;



const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		genra: {
			type: GraphQLString
		},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return _.find(authors, { id: parent.authorId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		},
		books: {
			type: GraphQLList(BookType),
			resolve(parent, args) {
				// return _.filter(books, { authorId: parent.id })
			}
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
					type: GraphQLID
				}
			},
			resolve(parent, args)  {
				// code to get data from db / other source
				// return _.find(books, { id: args.id });
			}
		},

		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				// return _.find(authors, { id: args.id });
			}
		},

		books: {
			type: GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			}
		},

		authors: {
			type: GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
})