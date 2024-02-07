import React, { useEffect, useState } from "react";

const Dashboard = ({ jwtToken }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [newBook, setNewBook] = useState({ name: "", pagesRead: 0, totalPages: 0 });

  const fetchData = async () => {
    try {
      // Fetch books
      const booksResponse = await fetch("http://localhost:80/books", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      const booksData = await booksResponse.json();
      setBooks(booksData);

      // Fetch favorites
      const favoritesResponse = await fetch("http://localhost:80/favorites", {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      const favoritesData = await favoritesResponse.json();
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jwtToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const addBook = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:80/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
      });

      if (response.ok) {
        // Refresh the list of books after adding a new one
        fetchData();

        // Clear the form after adding a new book
        setNewBook({ name: "", pagesRead: 0, totalPages: 0 });
      } else {
        console.error("Failed to add book:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred during book addition:", error);
    }
  };

  const handleButtonClick = async (bookId, bookName, pagesRead, totalPages) => {
    try {
      // Fetch details using the function
      const functionResponse = await fetch(`http://localhost:80/function/${pagesRead}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "text/plain"
        }
      });

      if (!functionResponse.ok) {
        console.error("Failed to fetch details:", functionResponse.statusText);
        return;
      }

      const updatedBook = {
        id: bookId,
        name: bookName,
        totalPages: totalPages,
        pagesRead: await functionResponse.json(),
      };

      console.log(updatedBook);

      const updateResponse = await fetch(`http://localhost:80/books/${bookId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBook)
      });

      if (updateResponse.ok) {
        console.log(`Updated book: ${bookId}`);

        fetchData();
      } else {
        console.error("Failed to update book:", updateResponse.statusText);
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };


  return (
    <div className="dashboard">
      <div className="table-container">
        <div className="column">
          <h3>Books</h3>
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Pages Read</th>
                <th>Total Pages</th>
                <th>Action</th>
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
                    <button onClick={() => handleButtonClick(book.id, book.name, book.pagesRead, book.totalPages)}>
                      Update Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <h3>Favorites</h3>
          <table>
            <thead>
              <tr>
                <th>Favorite ID</th>
                <th>Book Name</th>
                <th>Recommended</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <tr key={favorite.id}>
                  <td>{favorite.id}</td>
                  <td>{favorite.bookName}</td>
                  <td>{favorite.recommend ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <h3>Add New Book</h3>
          <form onSubmit={addBook}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
              required
            />
            <label>Pages Read:</label>
            <input
              type="text"
              name="pagesRead"
              value={newBook.pagesRead}
              onChange={handleInputChange}
              required
            />
            <label>Total Pages:</label>
            <input
              type="text"
              name="totalPages"
              value={newBook.totalPages}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;