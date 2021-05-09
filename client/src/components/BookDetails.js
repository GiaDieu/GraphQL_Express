import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = (props) => {
    const { bookId } = props;
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId },
    });

    const book = data && data.book;

    const renderingBook = () => {
        return loading ? null : error ? (
            <div>Something goes wrong!</div>
        ) : (
            <div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All Books by this author: </p>
                <ul className='other-books'>
                    {book.author.books.map((item) => {
                        return <li key={item.id}>{item.name}</li>;
                    })}
                </ul>
            </div>
        );
    };

    return book ? (
        <div id='book-details'>
            <p>Output Book details here</p>
            {renderingBook()}
        </div>
    ) : (
        <div>No Book selected...</div>
    );
};

export default BookDetails;
