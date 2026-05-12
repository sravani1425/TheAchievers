import { Container, Row, Col } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import PublicNavbar from '../components/layout/PublicNavbar';

const About = () => {
  return (
    <>
      <PublicNavbar />
      <Box sx={{ bgcolor: 'primary.light', color: 'white', py: 8, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold">About Us</Typography>
      </Box>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Typography variant="h5" gutterBottom fontWeight="bold">Our Mission</Typography>
            <Typography paragraph>
              The Student Development & Counselling System (SDCS) is built to bridge the gap between students, faculty mentors, and parents. Our platform ensures that no student falls behind by providing real-time tracking of academic performance, attendance, and backlogs.
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>Why Achievers Hub?</Typography>
            <Typography paragraph>
              We believe in holistic development. Beyond just grades, we provide tools for faculty to log crucial counselling sessions and for students to track their real-world internship experiences. By integrating parent communication directly into the ecosystem, we create a unified support network for every student.
            </Typography>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
