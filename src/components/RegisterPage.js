import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic
  };

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
      <Box component={Paper} elevation={6} style={{ padding: '40px', width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#1976d2', fontWeight: 'bold' }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button variant="contained" fullWidth style={{ backgroundColor: '#1976d2', color: '#fff', padding: '10px 30px' }} type="submit">
              Register
            </Button>
          </Box>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '15px' }}>
          Already have an account? <a href="/login" style={{ color: '#1976d2' }}>Login</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
