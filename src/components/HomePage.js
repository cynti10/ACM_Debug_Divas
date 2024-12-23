import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Secure Online Voting System
      </Typography>
      <Button variant="contained" component={Link} to="/register">
        Register
      </Button>
      <Button variant="contained" component={Link} to="/login" style={{ marginLeft: "10px" }}>
        Login
      </Button>
    </div>
  );
};

export default HomePage;
