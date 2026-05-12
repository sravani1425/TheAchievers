import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import PublicNavbar from '../components/layout/PublicNavbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <>
      <PublicNavbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-sm border-0 p-4 mt-5">
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Login to your account
                </Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    disabled={loading}
                    sx={{ mt: 2, py: 1.5 }}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Box>
              </form>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account? <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Sign up here</Link>
                </Typography>
              </Box>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
