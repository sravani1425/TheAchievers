import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />
      
      {/* Hero Section with Animated Gradient */}
      <Box className="bg-animated-gradient" sx={{ 
        color: 'white', 
        pt: { xs: 15, md: 20 }, 
        pb: { xs: 12, md: 18 }, 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container position="relative" sx={{ zIndex: 2 }}>
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800, 
            letterSpacing: '-0.02em',
            mb: 3,
            textShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            Empowering Student Success
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 5, 
            opacity: 0.95, 
            maxWidth: '800px', 
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.6
          }}>
            A comprehensive development and counselling platform designed to track academic progress, manage internships, and foster powerful mentorships.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              as={Link} 
              to="/register" 
              variant="light" 
              className="px-5 py-3 rounded-pill fw-bold fs-5 hover-lift"
              style={{
                backgroundColor: 'white',
                color: '#4f46e5',
                border: 'none',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)'
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
        
        {/* Decorative background circles */}
        <Box sx={{
          position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px',
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(40px)', zIndex: 1
        }} />
        <Box sx={{
          position: 'absolute', bottom: '-20%', right: '-5%', width: '400px', height: '400px',
          borderRadius: '50%', background: 'rgba(255,255,255,0.15)', filter: 'blur(50px)', zIndex: 1
        }} />
      </Box>

      {/* Features Section */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container>
          <Typography variant="h2" textAlign="center" sx={{ mb: 6 }}>
            Platform Features
          </Typography>
          <Row className="g-5">
            <Col md={4}>
              <Card className="h-100 border-0 glass-panel hover-lift text-center p-4">
                <Card.Body>
                  <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '16px', bgcolor: 'rgba(79, 70, 229, 0.1)', color: 'primary.main', mb: 3 }}>
                    <SchoolIcon sx={{ fontSize: 48 }} />
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    Expert Mentorship
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Get assigned to dedicated faculty mentors for personalized academic and career guidance.
                  </Typography>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 glass-panel hover-lift text-center p-4">
                <Card.Body>
                  <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '16px', bgcolor: 'rgba(6, 182, 212, 0.1)', color: 'secondary.main', mb: 3 }}>
                    <TimelineIcon sx={{ fontSize: 48 }} />
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    Academic Tracking
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Monitor your SGPA/CGPA, attendance, and backlogs through beautiful, interactive dashboards.
                  </Typography>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 glass-panel hover-lift text-center p-4">
                <Card.Body>
                  <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '16px', bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', mb: 3 }}>
                    <WorkIcon sx={{ fontSize: 48 }} />
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    Internship Portal
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Easily register your internships and securely upload completion certificates to the cloud.
                  </Typography>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0f172a', color: '#94a3b8', py: 4, mt: 'auto', borderTop: '1px solid #1e293b' }}>
        <Container className="text-center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Achievers Hub - Student Development & Counselling System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
