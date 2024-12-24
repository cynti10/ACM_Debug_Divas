import React, { useState } from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";

const VotingPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const handleVote = () => {
    if (selectedOption) {
      setMessage("Your vote has been cast successfully!");
    } else {
      setMessage("Please select an option to vote.");
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
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#1976d2", fontWeight: "bold" }}>
          Vote Now
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: selectedOption === "Option 1" ? "#388e3c" : "#1976d2",
              color: "#fff",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedOption("Option 1")}
          >
            Option 1
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: selectedOption === "Option 2" ? "#388e3c" : "#1976d2",
              color: "#fff",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedOption("Option 2")}
          >
            Option 2
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: selectedOption === "Option 3" ? "#388e3c" : "#1976d2",
              color: "#fff",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedOption("Option 3")}
          >
            Option 3
          </Button>
        </Box>
        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "600",
              padding: "10px 30px",
            }}
            onClick={handleVote}
          >
            Submit Vote
          </Button>
        </Box>
        {message && (
          <Typography
            variant="body1"
            style={{
              marginTop: "20px",
              color: message.includes("successfully") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default VotingPage;
