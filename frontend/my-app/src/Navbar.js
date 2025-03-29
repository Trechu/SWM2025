import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand href="#home">Catchy app name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/routes">Routes</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Invites</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;