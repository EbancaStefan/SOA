import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./styles.css";

function App() {
  const [errorMessages, setErrorMessages] = useState({});
  const [jwtToken, setJwtToken] = useState(() => {
    // Initialize jwtToken from localStorage, if available
    return localStorage.getItem("jwtToken1") || null;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const errors = {
    uname: "Invalid username or password",
    pass: "Invalid username or password"
  };

  const authenticateUser = async (username, password) => {
    try {
      const response = await fetch("http://localhost:80/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const token = await response.text();
        // Store jwtToken in localStorage
        localStorage.setItem("jwtToken1", token);
        setJwtToken(token);
        setIsSubmitted(true);
      } else {
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  useEffect(() => {
    // Check if jwtToken is available in localStorage
    const token = localStorage.getItem("jwtToken1");
    if (token) {
      setJwtToken(token);
      setIsSubmitted(true);
    }
    setIsLoading(false); // Set isLoading to false when component mounts
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;
    authenticateUser(uname.value, pass.value);
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {/* Render form if not submitted or loading */}
        {!isSubmitted && !isLoading ? renderForm : null}
        {/* Render Dashboard if submitted */}
        {isSubmitted ? <Dashboard jwtToken={jwtToken} /> : null}
      </div>
    </div>
  );
}

export default App;
