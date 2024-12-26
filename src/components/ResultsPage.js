import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Paper, Box } from "@mui/material";

const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVoteCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/votes/count");
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          // Find the candidate with the highest vote count
          const maxVoteCandidate = data[0]; // Assuming the data is sorted by vote count in descending order
          setWinner(maxVoteCandidate);
        } else {
          setError("No votes found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVoteCount();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f9"
      padding="20px"
    >
      <Paper
        elevation={3}
        style={{
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Voting Results
        </Typography>
        {loading ? (
          <>
            <CircularProgress style={{ marginBottom: "20px" }} />
            <Typography variant="h6" color="textSecondary">
              Results are being updated in real-time...
            </Typography>
          </>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          winner && (
            <>
              <Typography variant="h5" gutterBottom>
                Winner: {winner.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Votes: {winner.vote_count}
              </Typography>
            </>
          )
        )}
      </Paper>
    </Box>
  );
};

export default ResultsPage;
