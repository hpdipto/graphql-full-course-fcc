import React, { useState } from 'react';
import { graphql } from 'react-apollo';
// we'll remove this soon
import { flowRight as compose } from 'lodash';

import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries';


function AddBook(props) {

	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	const displayAuthors = () => {
		var data = props.getAuthorsQuery;
		if(data.loading) {
			return (
				<option disabled>Loading Authors...</option>
			);
		}
		else {
				return data.authors.map(author => {
					return (
						<option key={ author.id } value={ author.id }>{ author.name }</option>
					);
				});
		}
	}

	const submitForm = (e) => {
		e.preventDefault();

		// mutation
		props.addBookMutation({
				variables: {
					name,
					genre,
					authorId	
				},
				refetchQueries: [{ query:  getBooksQuery }]
		 });

		// clearing the form after submit
		setName("");
		setGenre("");
		setAuthorId("");
	}

  return (
    <form id="add-book" onSubmit={submitForm}>

    	<div className="field">
    		<label>Book Name:</label>
    		<input type="text" onChange={(e) => setName(e.target.value)} value={name} />
    	</div>

    	<div className="field">
    		<label>Genre:</label>
    		<input type="text" onChange={(e) => setGenre(e.target.value)} value={genre} />
    	</div>

    	<div className="field">
    		<label>Author:</label>
    		<select onChange={(e) => setAuthorId(e.target.value)} value={authorId} >
    			<option>Select author</option>
    			{ displayAuthors() }
    		</select>
    	</div>

    	<button>+</button>
    </form>
  );
}

export default compose(
									graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
									graphql(addBookMutation, { name: "addBookMutation" })
								)(AddBook);