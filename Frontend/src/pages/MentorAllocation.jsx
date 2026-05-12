import { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Typography, Button, Alert, Box } from '@mui/material';

const MentorAllocation = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // In a real app, you would fetch unassigned students and faculty mentors
  // For this demo, we'll assume the API provides lists of users by role.
  // We don't have a specific API for fetching by role yet, so we will use dummy data or generic fetch if we add it.

  const handleAllocate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/counselling/allocate', {
        studentId,
        mentorId,
        department,
        semester
      });
      setMessage('Mentor successfully allocated!');
      setStudentId('');
      setMentorId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to allocate mentor');
    }
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" gutterBottom>Mentor Allocation Panel</Typography>
      <Card className="shadow-sm border-0 p-4">
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Form onSubmit={handleAllocate}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Student ID (ObjectId)" 
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mentor ID</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Faculty ID (ObjectId)" 
                  value={mentorId}
                  onChange={(e) => setMentorId(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="e.g., Computer Science" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="e.g., 3rd Sem" 
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Allocate Mentor
            </Button>
          </Box>
        </Form>
      </Card>
    </Container>
  );
};

export default MentorAllocation;
