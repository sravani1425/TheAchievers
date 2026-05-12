import { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import { Typography, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';

const FeedbackAnalytics = () => {
  const [type, setType] = useState('Faculty');
  const [data, setData] = useState({ analytics: [], rawFeedbacks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [type]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/feedback/analytics/${type}`);
      setData(res.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Feedback Analytics</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Feedback Type</InputLabel>
          <Select value={type} label="Feedback Type" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="Faculty">Faculty Performance</MenuItem>
            <MenuItem value="Course">Course Evaluation</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white py-3">
                  <Typography variant="h6">Overall Rankings ({type})</Typography>
                </Card.Header>
                <Table responsive hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Rank</th>
                      <th>{type} Name</th>
                      <th>{type} Code/ID</th>
                      <th>Total Feedbacks</th>
                      <th>Avg Rating (out of 5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.analytics.map((item, idx) => (
                      <tr key={item._id}>
                        <td>#{idx + 1}</td>
                        <td><strong>{item.targetName}</strong></td>
                        <td>{item._id}</td>
                        <td>{item.totalFeedbacks} submissions</td>
                        <td>
                          <Chip 
                            label={item.overallAverage.toFixed(1)} 
                            color={item.overallAverage >= 4 ? 'success' : item.overallAverage >= 3 ? 'warning' : 'error'} 
                            sx={{ fontWeight: 'bold' }}
                          />
                        </td>
                      </tr>
                    ))}
                    {data.analytics.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-4">No data available.</td></tr>
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          <Typography variant="h5" gutterBottom>Raw Feedback Submissions</Typography>
          <Card className="shadow-sm border-0 p-3">
            <Table responsive hover size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Target</th>
                  <th>Student</th>
                  <th>Avg Rating</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {data.rawFeedbacks.map((fb) => (
                  <tr key={fb._id}>
                    <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
                    <td>{fb.targetName}</td>
                    <td>{fb.isAnonymous ? <em>Anonymous</em> : fb.student?.name}</td>
                    <td>{fb.averageRating.toFixed(1)} / 5</td>
                    <td>{fb.comments || <em>No comments</em>}</td>
                  </tr>
                ))}
                {data.rawFeedbacks.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-muted">No submissions found.</td></tr>
                )}
              </tbody>
            </Table>
          </Card>
        </>
      )}
    </Container>
  );
};

export default FeedbackAnalytics;
