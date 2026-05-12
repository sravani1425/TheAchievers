import { Container, Row, Col, Form } from 'react-bootstrap';
import { Typography, Box, Button } from '@mui/material';
import PublicNavbar from '../components/layout/PublicNavbar';

const Contact = () => {
  return (
    <>
      <PublicNavbar />
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold">Contact Support</Typography>
      </Box>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">Get in Touch</Typography>
            <Typography paragraph color="textSecondary">
              Have a question or facing a technical issue? Fill out the form below and our support team will get back to you.
            </Typography>
            
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} />
              </Form.Group>
              <Button variant="contained" color="primary" size="large">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
