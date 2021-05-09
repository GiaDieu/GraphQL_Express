import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBook, setSelectedBook] = useState(null);

    const renderingBooks = () => {
        return loading ? (
            <div>Loading books...</div>
        ) : error ? (
            <div>Cannot be found</div>
        ) : (
            data.books.map((book, index) => {
                return (
                    <li
                        key={`${book.authorId}${index}`}
                        onClick={() => setSelectedBook(book.id)}
                    >
                        {book.name}
                    </li>
                );
            })
        );
    };

    return (
        <div>
            <ul id='book-list'>{renderingBooks()}</ul>
            <BookDetails bookId={selectedBook} />
        </div>
    );
};

export default BookList;
