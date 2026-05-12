import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Typography, Button, Alert, Box, TextField, MenuItem } from '@mui/material';
import PublicNavbar from '../components/layout/PublicNavbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await register({ name, email, password, role, department, phone });
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
      <Container className="d-flex align-items-center justify-content-center mt-5 mb-5">
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0 p-4">
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                  Create an Account
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Join the Student Development & Counselling System
                </Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Full Name" variant="outlined" required fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                  <TextField label="Email Address" type="email" variant="outlined" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                  <TextField label="Password" type="password" variant="outlined" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                  
                  <TextField select label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth required>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="faculty">Faculty / Mentor</MenuItem>
                    <MenuItem value="parent">Parent</MenuItem>
                  </TextField>

                  {(role === 'student' || role === 'faculty') && (
                    <TextField label="Department" placeholder="e.g., Computer Science" variant="outlined" fullWidth value={department} onChange={(e) => setDepartment(e.target.value)} />
                  )}

                  <TextField label="Phone Number" variant="outlined" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />

                  <Button type="submit" variant="contained" color="primary" size="large" disabled={loading} sx={{ mt: 2, py: 1.5 }}>
                    {loading ? 'Registering...' : 'Sign Up'}
                  </Button>
                </Box>
              </Form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Already have an account? <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
                </Typography>
              </Box>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
