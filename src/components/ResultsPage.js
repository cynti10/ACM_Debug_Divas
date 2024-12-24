import React from "react";
import { Typography, CircularProgress, Paper, Box } from "@mui/material";

const ResultsPage = () => {
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
        <CircularProgress style={{ marginBottom: "20px" }} />
        <Typography variant="h6" color="textSecondary">
          Results are being updated in real-time...
        </Typography>
      </Paper>
    </Box>
  );
};

export default ResultsPage;
