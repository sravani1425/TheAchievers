import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Container, Card, Row, Col, Table, Alert } from 'react-bootstrap';
import { Typography, Box, CircularProgress, LinearProgress } from '@mui/material';

const AttendanceDashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, [user]);

  const fetchAttendance = async () => {
    try {
      if (user) {
        const res = await api.get(`/attendance/student/${user._id}`);
        setData(res.data);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (!data) return <Container className="mt-4"><Typography>No attendance data found.</Typography></Container>;

  return (
    <Container className="mt-4 mb-5">
      <Typography variant="h4" gutterBottom>Attendance Dashboard</Typography>
      
      {data.hasShortage && (
        <Alert variant="danger" className="mb-4">
          <Typography variant="subtitle1" fontWeight="bold">
            ⚠️ Attendance Shortage Warning
          </Typography>
          You have fallen below the 75% attendance threshold in one or more subjects. Please contact your mentor.
        </Alert>
      )}

      <Card className="shadow-sm border-0 mb-4 p-4 text-center bg-light">
        <Typography variant="h5" color="textSecondary">Overall Attendance</Typography>
        <Typography variant="h2" fontWeight="bold" color={data.overallPercentage < 75 ? 'error.main' : 'primary.main'}>
          {data.overallPercentage}%
        </Typography>
      </Card>

      <Typography variant="h5" gutterBottom>Subject-wise Summary</Typography>
      <Row className="mb-4">
        {data.summary.map((sub, idx) => (
          <Col md={6} lg={4} key={idx} className="mb-3">
            <Card className="shadow-sm h-100 border-0">
              <Card.Body>
                <Typography variant="h6">{sub.subjectName}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Code: {sub.subjectCode} | Classes: {sub.present}/{sub.total}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={Number(sub.percentage)} 
                      color={sub.isShortage ? 'error' : 'success'}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="textSecondary">{sub.percentage}%</Typography>
                  </Box>
                </Box>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Typography variant="h5" gutterBottom>Recent Daily Records</Typography>
      <Card className="shadow-sm border-0">
        <Table responsive hover>
          <thead className="bg-light">
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.records.map((rec) => (
              <tr key={rec._id}>
                <td>{new Date(rec.date).toLocaleDateString()}</td>
                <td>{rec.subjectName} ({rec.subjectCode})</td>
                <td>
                  <span className={`badge bg-${rec.status === 'Present' ? 'success' : rec.status === 'Late' ? 'warning' : 'danger'}`}>
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default AttendanceDashboard;
