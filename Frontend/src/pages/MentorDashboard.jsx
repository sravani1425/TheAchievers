import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Container, Card, Table } from 'react-bootstrap';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const MentorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [user]);

  const fetchStudents = async () => {
    try {
      if(user) {
        const { data } = await api.get(`/counselling/mentor/${user._id}`);
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleOpenSession = (mentorshipId) => {
    setSelectedMentorship(mentorshipId);
    setOpen(true);
  };

  const handleSubmitSession = async () => {
    try {
      await api.post('/counselling/session', {
        mentorshipId: selectedMentorship,
        sessionDate: new Date(),
        counsellingRemarks: remarks
      });
      setOpen(false);
      setRemarks('');
      alert('Session saved successfully!');
    } catch (error) {
      console.error('Error saving session', error);
      alert('Failed to save session');
    }
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" gutterBottom>Mentor Dashboard</Typography>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((record) => (
                <tr key={record._id}>
                  <td>{record.student.name}</td>
                  <td>{record.student.email}</td>
                  <td>{record.department}</td>
                  <td>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small"
                      onClick={() => handleOpenSession(record._id)}
                    >
                      Add Session
                    </Button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">No students assigned yet.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Session Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Counselling Session</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Counselling Remarks"
              multiline
              rows={4}
              fullWidth
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitSession} variant="contained" color="primary">Save Session</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MentorDashboard;
