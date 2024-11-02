import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBooks = async (params = {}) => {
    try {
      let url = `/functions/v1/books?`;
      if (params.author_id) url += `author_id=${params.author_id}&`;
      if (params.sort) url += `sort=${params.sort}&`;
      if (params.limit) url += `limit=${params.limit}&`;
      if (params.offset) url += `offset=${params.offset}`;

      const { data, error } = await supabase.functions.invoke(url);
      if (error) throw error;

      setBooks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBooks({ limit: 10, sort: 'asc' }); // Initial fetch with pagination
  }, []);

  return (
    <div>
      {error ? <p>Error: {error}</p> : <ul>{books.map(book => <li key={book.id}>{book.title}</li>)}</ul>}
    </div>
  );
};

export default BookList;
