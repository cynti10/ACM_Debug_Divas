import React from "react";
import { Typography, Button, Grid, Box, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle, Login } from "@mui/icons-material"; // Material UI Icons
import { alpha } from "@mui/material/styles"; // Correct import for alpha transparency

const HomePage = () => {
  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa", // Light grey background for a clean look
      }}
    >
      <Box
        component={Paper}
        elevation={6}
        style={{
          backgroundColor: "#ffffff", // White background for content
          padding: "40px",
          borderRadius: "15px", // Rounded corners for modern look
          textAlign: "center",
          width: "100%",
          maxWidth: "650px", // Max width for better proportioning
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} // Hover effect
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#1976d2", // Primary color for emphasis
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Welcome to the Secure Online Voting System
        </Typography>
        <Typography
          variant="h6"
          paragraph
          style={{
            color: "#555", // Subtle text color
            marginBottom: "30px",
          }}
        >
          Vote securely and confidently. Your participation is key to shaping the future!
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              to="/register"
              startIcon={<AccountCircle />}
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                backgroundColor: "#1976d2", // Primary blue
                color: "#fff",
                fontWeight: "600",
                textTransform: "none",
                boxShadow: `0 4px 12px ${alpha("#1976d2", 0.5)}`, // Hover shadow effect using alpha
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1565c0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              startIcon={<Login />}
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                backgroundColor: "#388e3c", // Green for Login
                color: "#fff",
                fontWeight: "600",
                textTransform: "none",
                boxShadow: `0 4px 12px ${alpha("#388e3c", 0.5)}`,
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2c6e2f"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#388e3c"}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
