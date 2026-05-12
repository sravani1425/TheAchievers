import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Container, Card, Form, Row, Col, Table, Badge, Spinner } from 'react-bootstrap';
import { Typography, Button, Alert, Box, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const InternshipTracker = () => {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInternships();
  }, [user]);

  const fetchInternships = async () => {
    try {
      const res = await api.get('/internships/my-internships');
      setInternships(res.data);
    } catch (error) {
      console.error('Error fetching internships', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/internships/register', {
        companyName,
        roleTitle,
        startDate,
        endDate
      });
      setMessage('Internship registered successfully!');
      fetchInternships();
      setCompanyName('');
      setRoleTitle('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register internship');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (id) => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }
    setUploadingId(id);
    setError('');
    
    const formData = new FormData();
    formData.append('certificate', selectedFile);

    try {
      await api.post(`/internships/upload/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Certificate uploaded successfully!');
      fetchInternships();
      setSelectedFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload certificate');
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Typography variant="h4" gutterBottom>Internship & Project Tracker</Typography>
      
      <Row>
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm border-0 p-4 h-100">
            <Typography variant="h6" gutterBottom>Register New Internship</Typography>
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role / Title</Form.Label>
                <Form.Control type="text" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} required />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="contained" color="primary" fullWidth>Register Project</Button>
            </Form>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="shadow-sm border-0 p-4">
            <Typography variant="h6" gutterBottom>My Internships</Typography>
            
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {internships.map(internship => (
                  <tr key={internship._id}>
                    <td>{internship.companyName}</td>
                    <td>{internship.roleTitle}</td>
                    <td>
                      <small>
                        {new Date(internship.startDate).toLocaleDateString()} - <br/>
                        {new Date(internship.endDate).toLocaleDateString()}
                      </small>
                    </td>
                    <td>
                      <Badge bg={
                        internship.projectStatus === 'Verified' ? 'success' : 
                        internship.projectStatus === 'Completed' ? 'primary' : 
                        internship.projectStatus === 'In Progress' ? 'warning' : 'secondary'
                      }>
                        {internship.projectStatus}
                      </Badge>
                    </td>
                    <td>
                      {internship.certificateUrl ? (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          href={internship.certificateUrl} 
                          target="_blank"
                        >
                          View
                        </Button>
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Form.Control type="file" size="sm" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
                          <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small" 
                            startIcon={uploadingId === internship._id ? <Spinner size="sm" /> : <CloudUploadIcon />}
                            disabled={uploadingId === internship._id}
                            onClick={() => handleUpload(internship._id)}
                          >
                            Upload
                          </Button>
                        </Box>
                      )}
                    </td>
                  </tr>
                ))}
                {internships.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No internships registered yet.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InternshipTracker;
