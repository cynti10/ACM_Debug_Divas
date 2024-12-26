import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router's hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Error: Email and password fields cannot be empty!");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Error: Please enter a valid email address!");
    } else {
      try {
        // Make an API call to validate the user
        const response = await axios.post("http://localhost:5000/users", { email, password });

        if (response.status === 200 && response.data.success) {
          setMessage(""); 
          // Clear any error messages
          const username = response.data.user.name; // Assuming username is returned in the response
          
          // Show alert with the user's name
          alert(`Hello, ${username}!`);
          navigate("/vote", { state: { user: response.data.user } }); // Redirect to VotingPage
        } else {
          setMessage(response.data.message || "Error: Invalid email or password.");
        }
      } catch (error) {
        setMessage("Error: Unable to process login. Please try again later.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <Box
        component={Paper}
        elevation={6}
        style={{
          padding: "40px",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ textAlign: "center", color: "#1976d2", fontWeight: "bold" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              padding: "10px 0",
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "600",
              marginBottom: "20px",
              borderRadius: "5px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            Login
          </Button>
        </form>
        {message && (
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              color: message.startsWith("Hello") ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;

