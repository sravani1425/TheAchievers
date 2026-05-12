import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Container, Row, Col, Card as BootstrapCard, Table, Badge } from 'react-bootstrap';
import { Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AcademicDashboard = () => {
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [backlogs, setBacklogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademicData();
  }, [user]);

  const fetchAcademicData = async () => {
    try {
      if (user) {
        const [academicRes, backlogRes] = await Promise.all([
          api.get(`/academic/student/${user._id}`),
          api.get(`/academic/backlogs/${user._id}`)
        ]);
        
        setRecords(academicRes.data.records);
        setCgpa(academicRes.data.cgpa);
        setBacklogs(backlogRes.data);
      }
    } catch (error) {
      console.error('Error fetching academic data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Chart data
  const chartData = {
    labels: records.map(r => `Sem ${r.semester}`),
    datasets: [
      {
        label: 'SGPA Trend',
        data: records.map(r => r.sgpa),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Container className="mt-4 mb-5">
      <Typography variant="h4" gutterBottom>Academic Progress Dashboard</Typography>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card sx={{ height: '100%', bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Current CGPA</Typography>
              <Typography variant="h2" fontWeight="bold">{cgpa}</Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={6}>
          <Card sx={{ height: '100%', bgcolor: backlogs.length > 0 ? 'error.main' : 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Active Backlogs</Typography>
              <Typography variant="h2" fontWeight="bold">{backlogs.length}</Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <BootstrapCard className="shadow-sm border-0 p-3">
            <Typography variant="h6" gutterBottom>SGPA Trend</Typography>
            <Box sx={{ height: 300 }}>
              <Line options={{ maintainAspectRatio: false }} data={chartData} />
            </Box>
          </BootstrapCard>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <BootstrapCard className="shadow-sm border-0 mb-4">
            <BootstrapCard.Header className="bg-white">
              <Typography variant="h6">Semester Transcripts</Typography>
            </BootstrapCard.Header>
            <BootstrapCard.Body>
              {records.map((record) => (
                <Box key={record._id} sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Semester {record.semester} - SGPA: {record.sgpa} 
                    <Badge bg={record.status === 'Pass' ? 'success' : 'danger'} className="ms-2">
                      {record.status}
                    </Badge>
                  </Typography>
                  <Table size="sm" bordered hover>
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Credits</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.subjects.map((sub, idx) => (
                        <tr key={idx} className={sub.grade === 'F' ? 'table-danger' : ''}>
                          <td>{sub.subjectCode}</td>
                          <td>{sub.subjectName}</td>
                          <td>{sub.credits}</td>
                          <td>{sub.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              ))}
              {records.length === 0 && <Typography color="textSecondary">No academic records found.</Typography>}
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
      </Row>
    </Container>
  );
};

export default AcademicDashboard;
