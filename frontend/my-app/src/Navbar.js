import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");

    navigate('/routes', {replace: true});
  }
  
  return (
    <Navbar expand="lg" className="bg-transparent" variant='dark'>
      <Container>
        <Navbar.Brand><h4>CluelessApp</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/routes">Routes</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item >Invites</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
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