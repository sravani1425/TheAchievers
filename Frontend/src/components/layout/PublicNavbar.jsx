import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const PublicNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
          Achievers Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/" className="text-dark fw-medium mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-dark fw-medium mx-2">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-dark fw-medium mx-2">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-primary" className="me-2 px-4 rounded-pill fw-bold">Login</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              <Button variant="primary" className="px-4 rounded-pill fw-bold shadow-sm">Sign Up</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;
