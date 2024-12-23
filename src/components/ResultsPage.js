import React from "react";
import { Typography, CircularProgress } from "@mui/material";

const ResultsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Voting Results
      </Typography>
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Results are being updated in real-time...
      </Typography>
    </div>
  );
};

export default ResultsPage;
