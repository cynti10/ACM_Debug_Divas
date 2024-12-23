import React from "react";
import { Typography, Button } from "@mui/material";

const VotingPage = () => {
  const handleVote = (candidateId) => {
    // Send the vote to backend (Flask) API
    console.log(`Voted for candidate with ID: ${candidateId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Choose Your Candidate
      </Typography>
      <Button variant="contained" onClick={() => handleVote(1)}>
        Candidate 1
      </Button>
      <Button variant="contained" onClick={() => handleVote(2)} style={{ marginLeft: "10px" }}>
        Candidate 2
      </Button>
    </div>
  );
};

export default VotingPage;
