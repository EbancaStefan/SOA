import React, { useState, useEffect } from 'react';
import "./styles.css";

const FavoriteMicrofrontend = () => {
  const [favorites, setFavorites] = useState([]);
  const [modifiedFavorites, setModifiedFavorites] = useState([]);
  const [jwtToken, setJwtToken] = useState(() => {
    // Initialize jwtToken from localStorage, if available
    return localStorage.getItem('jwtToken') || '';
  });

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await fetch("http://localhost:80/favorites", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const favoritesData = await response.json();
          setFavorites(favoritesData);
          setModifiedFavorites(favoritesData);
        } else {
          console.error("Failed to fetch favorites:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const authenticate = async () => {
      try {
        const response = await fetch("http://localhost:80/auth/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: 'user_pentru_web3', password: 'user' })
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
      // Fetch favorites with existing jwtToken
      fetchData(jwtToken);
    }
  }, [jwtToken]); // Add jwtToken as a dependency

  const handleButtonClick = async (favoriteId) => {
    const clickedFavorite = favorites.find((favorite) => favorite.id === favoriteId);

    if (clickedFavorite) {
      try {
        const response = await fetch(`http://localhost:80/kafka?message=${clickedFavorite.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          console.log(`Post request successful for favorite with ID: ${favoriteId}`);

          setModifiedFavorites((prevFavorites) => prevFavorites.map(favorite => favorite.id === favoriteId ? { ...favorite, recommend: true } : favorite));
        } else {
          console.error("Failed to send post request:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending post request:", error);
      }
    } else {
      console.error(`Favorite with ID ${favoriteId} not found`);
    }
  };

  return (
    <div className="login-form">
          <h2>Favorites</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Recommended</th>
              </tr>
            </thead>
            <tbody>
              {modifiedFavorites.map((favorite) => (
                <tr key={favorite.id}>
                  <td>{favorite.id}</td>
                  <td>{favorite.bookName}</td>
                  <td>{favorite.recommend ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleButtonClick(favorite.id)}>
                      Recommend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
};

export default FavoriteMicrofrontend;
