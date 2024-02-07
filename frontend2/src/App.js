import React, { useState, useEffect } from 'react';
import "./styles.css";

const MicrofrontendApp = () => {
  const [books, setBooks] = useState([]);
  const [jwtToken, setJwtToken] = useState(() => {
    // Initialize jwtToken from localStorage, if available
    return localStorage.getItem('jwtToken') || '';
  });

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await fetch("http://localhost:80/books", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const booksData = await response.json();
          setBooks(booksData);
        } else {
          console.error("Failed to fetch books:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const authenticate = async () => {
      try {
        const response = await fetch("http://localhost:80/auth/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: 'user_pentru_web2', password: 'user' })
        });

        if (response.ok) {
          const token = await response.text();
          setJwtToken(token);
          // Store jwtToken in localStorage
          localStorage.setItem('jwtToken', token);
          fetchData(token);
        } else {
          console.error("Failed to authenticate:", response.statusText);
        }
      } catch (error) {
        console.error("Error occurred during authentication:", error);
      }
    };

    // Check if jwtToken is available, if not, authenticate
    if (!jwtToken) {
      authenticate();
    } else {
      fetchData(jwtToken);
    }
  }, [jwtToken]);
  const handleButtonClick = async (bookId) => {
    const clickedBook = books.find((book) => book.id === bookId);

    if (clickedBook) {
      try {
        const response = await fetch("http://localhost:80/publish", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookName: clickedBook.name,
            recommend: false,
          }),
        });

        if (response.ok) {
          console.log(`Post request successful for book with ID: ${bookId}`);
        } else {
          console.error("Failed to send post request:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending post request:", error);
      }
    } else {
      console.error(`Book with ID ${bookId} not found`);
    }
  };

  return (
    <div className="login-form">
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Pages Read</th>
            <th>Total Pages</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.pagesRead}</td>
              <td>{book.totalPages}</td>
              <td>
                <button onClick={() => handleButtonClick(book.id)}>
                  Add to favorites
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MicrofrontendApp;
