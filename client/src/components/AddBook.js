import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    getAuthorsQuery,
    addBookMutation,
    getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);

    const [books, setBooks] = useState({
        name: '',
        genre: '',
        authorId: '',
    });

    //Mutation
    const [addBook] = useMutation(addBookMutation);

    const renderingAuthors = () => {
        return loading ? (
            <option disabled>Loading Authors...</option>
        ) : error ? (
            <option disabled>Cannot be found</option>
        ) : (
            data.authors.map((author) => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            })
        );
    };

    const onHandleChange = (e) => {
        const targetValue = e.target.value;
        setBooks({ ...books, [e.target.name]: targetValue });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name: books.name,
                genre: books.genre,
                authorId: books.authorId,
            },
            refetchQueries: [{ query: getBooksQuery }],
        });
    };
    return (
        <form id='add-book' onSubmit={onSubmitForm}>
            <div className='field'>
                <label>Book Name:</label>
                <input
                    type='text'
                    name='name'
                    onChange={onHandleChange}
                    value={books.name}
                />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input
                    type='text'
                    name='genre'
                    onChange={onHandleChange}
                    value={books.genre}
                />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select name='authorId' onChange={onHandleChange}>
                    <option>Select Author</option>
                    {renderingAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
};

export default AddBook;
