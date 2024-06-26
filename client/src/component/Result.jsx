import React, { useEffect, useState } from 'react';
import './Result.css';

function Result() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/Books/Get');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h3>{books.length} results for "Books"</h3>
      <div className='eachbook'>
        {books.map((book) => (
          <div key={book._id}>
            <img src={book.image} alt={book.name} />
            <h4>{book.name}</h4>
            <p>{book.price ? `Price: Rs.${book.price}` : 'Price not available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;