import { useState } from 'react';
import api from '../services/api';
import { Container, Card, Form, Row, Col, Table } from 'react-bootstrap';
import { Typography, Button, Alert, Box } from '@mui/material';

const MarkAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [studentId, setStudentId] = useState(''); // For demo, we add one student at a time to the array
  const [status, setStatus] = useState('Present');
  
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!studentId) return;
    
    // Check if student already in the list
    if (records.find(r => r.studentId === studentId)) {
      alert('Student already added to this batch.');
      return;
    }
    
    setRecords([...records, { studentId, status }]);
    setStudentId('');
  };

  const handleRemoveRecord = (idToRemove) => {
    setRecords(records.filter(r => r.studentId !== idToRemove));
  };

  const handleSubmit = async () => {
    setMessage('');
    setError('');

    if (records.length === 0 || !subjectCode || !subjectName || !date) {
      setError('Please fill all required fields and add at least one student.');
      return;
    }

    try {
      const res = await api.post('/attendance/mark', {
        date,
        subjectCode,
        subjectName,
        records
      });
      setMessage(`Successfully marked attendance for ${res.data.count} students.`);
      setRecords([]); // Clear form
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit attendance');
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Typography variant="h4" gutterBottom>Mark Daily Attendance</Typography>
      <Card className="shadow-sm border-0 p-4">
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Subject Code</Form.Label>
              <Form.Control type="text" placeholder="e.g., CS101" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Subject Name</Form.Label>
              <Form.Control type="text" placeholder="e.g., Data Structures" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <Typography variant="h6" gutterBottom>Add Student to Batch</Typography>
        
        <Form onSubmit={handleAddRecord} className="mb-4">
          <Row className="align-items-end">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Student ID (ObjectId)</Form.Label>
                <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter Student ObjectId" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ height: 38 }}>
                Add
              </Button>
            </Col>
          </Row>
        </Form>

        <Typography variant="h6" gutterBottom>Current Batch ({records.length})</Typography>
        <Table responsive bordered hover size="sm">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx}>
                <td>{r.studentId}</td>
                <td>{r.status}</td>
                <td>
                  <Button size="small" color="error" onClick={() => handleRemoveRecord(r.studentId)}>Remove</Button>
                </td>
              </tr>
            ))}
            {records.length === 0 && <tr><td colSpan="3" className="text-center text-muted">No students added to batch yet.</td></tr>}
          </tbody>
        </Table>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={records.length === 0}>
            Submit Attendance Batch
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default MarkAttendance;
