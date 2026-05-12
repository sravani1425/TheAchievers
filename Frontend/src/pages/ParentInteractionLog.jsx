import { useState } from 'react';
import api from '../services/api';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Typography, Button, Alert, Box, Paper } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const ParentInteractionLog = () => {
  const [studentId, setStudentId] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [interactionDate, setInteractionDate] = useState(new Date().toISOString().split('T')[0]);
  const [interactionType, setInteractionType] = useState('Phone Call');
  const [discussionSummary, setDiscussionSummary] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [followUpAction, setFollowUpAction] = useState('');
  
  const [interactions, setInteractions] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchInteractions = async () => {
    if (!searchId) return;
    try {
      const res = await api.get(`/parents/student/${searchId}`);
      setInteractions(res.data);
      if (res.data.length === 0) {
        setError('No interactions found for this student.');
      } else {
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch timeline.');
    }
  };

  const handleLogInteraction = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/parents/interaction', {
        studentId,
        parentName,
        parentContact,
        interactionDate,
        interactionType,
        discussionSummary,
        feedbackNotes,
        followUpAction
      });
      setMessage('Interaction logged successfully!');
      // Clear form
      setParentName('');
      setParentContact('');
      setDiscussionSummary('');
      setFeedbackNotes('');
      setFollowUpAction('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log interaction');
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Typography variant="h4" gutterBottom>Parent Interactions</Typography>
      
      <Row>
        <Col lg={6}>
          <Card className="shadow-sm border-0 p-4 mb-4">
            <Typography variant="h6" gutterBottom>Log New Interaction</Typography>
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Form onSubmit={handleLogInteraction}>
              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parent/Guardian Name</Form.Label>
                    <Form.Control type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Info (Phone/Email)</Form.Label>
                    <Form.Control type="text" value={parentContact} onChange={(e) => setParentContact(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={interactionDate} onChange={(e) => setInteractionDate(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Interaction Type</Form.Label>
                    <Form.Select value={interactionType} onChange={(e) => setInteractionType(e.target.value)}>
                      <option>Phone Call</option>
                      <option>Email</option>
                      <option>In-Person Meeting</option>
                      <option>Online Meeting</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Discussion Summary</Form.Label>
                <Form.Control as="textarea" rows={3} value={discussionSummary} onChange={(e) => setDiscussionSummary(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Feedback / Concerns</Form.Label>
                <Form.Control as="textarea" rows={2} value={feedbackNotes} onChange={(e) => setFeedbackNotes(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Follow-up Action</Form.Label>
                <Form.Control type="text" value={followUpAction} onChange={(e) => setFollowUpAction(e.target.value)} placeholder="E.g., Schedule next meeting in 2 weeks" />
              </Form.Group>
              <Button type="submit" variant="contained" color="primary">Log Interaction</Button>
            </Form>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm border-0 p-4">
            <Typography variant="h6" gutterBottom>Interaction Timeline</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Form.Control type="text" placeholder="Enter Student ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
              <Button variant="outlined" onClick={fetchInteractions}>Search</Button>
            </Box>

            <Timeline position="alternate">
              {interactions.map((interaction, index) => (
                <TimelineItem key={interaction._id}>
                  <TimelineSeparator>
                    <TimelineDot color={interaction.interactionType === 'In-Person Meeting' ? 'primary' : 'secondary'} />
                    {index < interactions.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} sx={{ p: 2, bgcolor: '#fdfdfd' }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        {new Date(interaction.interactionDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="h6" component="span">
                        {interaction.interactionType}
                      </Typography>
                      <Typography color="textSecondary" sx={{ mb: 1 }}>with {interaction.parentName}</Typography>
                      <Typography variant="body2">{interaction.discussionSummary}</Typography>
                      {interaction.followUpAction && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'error.main' }}>
                          Follow up: {interaction.followUpAction}
                        </Typography>
                      )}
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            {interactions.length === 0 && !error && <Typography color="textSecondary">Enter a student ID to view timeline.</Typography>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ParentInteractionLog;
