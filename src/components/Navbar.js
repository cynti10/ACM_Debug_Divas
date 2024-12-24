import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky" style={{ backgroundColor: "#1976d2" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo or Title */}
        <Box>
          <Typography variant="h6" style={{ fontWeight: "bold", color: "#fff" }}>
            Voting System
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box style={{ display: "flex", gap: "20px" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/vote">
            Vote
          </Button>
          <Button color="inherit" component={Link} to="/results">
            Results
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
