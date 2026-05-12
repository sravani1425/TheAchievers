import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box, Button } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome, {user?.name}! You are logged in as {user?.role.toUpperCase()}.
        </Typography>
        <Button variant="outlined" color="error" sx={{ mt: 3 }} onClick={logout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
