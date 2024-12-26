import React, { useState } from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";

const VotingPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    if (!selectedOption) {
      setMessage("Please select an option to vote.");
      return;
    }

    try {
      // Simulate user ID for demonstration (replace with actual user ID in production)
      const userId = 1;

      // API call to save the vote
      const response = await fetch("http://127.0.0.1:5000/add_vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          candidate_id: selectedOption, // Send selected candidate ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Your vote has been cast successfully!");
      } else {
        setMessage(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message || "Unable to submit your vote."}`);
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
              backgroundColor: selectedOption === "1" ? "#388e3c" : "#1976d2",
              color: "#fff",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedOption("1")} // Option ID: 1
          >
            Option 1
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: selectedOption === "2" ? "#388e3c" : "#1976d2",
              color: "#fff",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedOption("2")} // Option ID: 2
          >
            Option 2
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: selectedOption === "3" ? "#388e3c" : "#1976d2",
              color: "#fff",
              marginBottom: "10px",
            }}
            onClick={() => setSelectedOption("3")} // Option ID: 3
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
