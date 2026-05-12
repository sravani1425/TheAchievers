import { useState } from 'react';
import api from '../services/api';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Typography, Button, Alert, Box, Rating, FormControlLabel, Switch } from '@mui/material';

const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState('Course');
  const [targetId, setTargetId] = useState('');
  const [targetName, setTargetName] = useState('');
  const [semester, setSemester] = useState('');
  const [comments, setComments] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  // Rating states
  const [teachingClarity, setTeachingClarity] = useState(0);
  const [subjectKnowledge, setSubjectKnowledge] = useState(0);
  const [communicationSkills, setCommunicationSkills] = useState(0);
  const [studentEngagement, setStudentEngagement] = useState(0);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!teachingClarity || !subjectKnowledge || !communicationSkills || !studentEngagement) {
      setError('Please provide a rating for all criteria.');
      return;
    }

    try {
      await api.post('/feedback/submit', {
        feedbackType,
        targetId,
        targetName,
        semester,
        comments,
        isAnonymous,
        ratings: {
          teachingClarity,
          subjectKnowledge,
          communicationSkills,
          studentEngagement
        }
      });
      setMessage('Feedback submitted successfully. Thank you!');
      // Reset form
      setTargetId('');
      setTargetName('');
      setComments('');
      setTeachingClarity(0);
      setSubjectKnowledge(0);
      setCommunicationSkills(0);
      setStudentEngagement(0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Typography variant="h4" gutterBottom>Submit Feedback</Typography>
      
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0 p-4">
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Feedback Type</Form.Label>
                    <Form.Select value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)}>
                      <option value="Course">Course Feedback</option>
                      <option value="Faculty">Faculty Feedback</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="text" value={semester} onChange={(e) => setSemester(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{feedbackType} Code/ID</Form.Label>
                    <Form.Control type="text" value={targetId} onChange={(e) => setTargetId(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{feedbackType} Name</Form.Label>
                    <Form.Control type="text" value={targetName} onChange={(e) => setTargetName(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>

              <hr />
              <Typography variant="h6" gutterBottom>Evaluation Criteria</Typography>
              
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="legend">Clarity of Content/Teaching</Typography>
                <Rating value={teachingClarity} onChange={(event, newValue) => setTeachingClarity(newValue)} size="large" />
              </Box>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="legend">Subject Knowledge/Relevance</Typography>
                <Rating value={subjectKnowledge} onChange={(event, newValue) => setSubjectKnowledge(newValue)} size="large" />
              </Box>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="legend">Communication & Material Quality</Typography>
                <Rating value={communicationSkills} onChange={(event, newValue) => setCommunicationSkills(newValue)} size="large" />
              </Box>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="legend">Engagement & Support</Typography>
                <Rating value={studentEngagement} onChange={(event, newValue) => setStudentEngagement(newValue)} size="large" />
              </Box>

              <Form.Group className="mb-3">
                <Form.Label>Additional Comments / Suggestions</Form.Label>
                <Form.Control as="textarea" rows={3} value={comments} onChange={(e) => setComments(e.target.value)} />
              </Form.Group>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <FormControlLabel 
                  control={<Switch checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} color="primary" />} 
                  label={isAnonymous ? "Submitting Anonymously" : "Include my Name & ID"} 
                />
                <Button type="submit" variant="contained" color="primary" size="large">Submit Feedback</Button>
              </Box>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackForm;
