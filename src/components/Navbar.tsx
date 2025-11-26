import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/Navbar.css";

const NavBar = () => {
  return (
    <Navbar fixed="top" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand href="#">Jason Chen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link href="#intro">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#experience">Experience</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
          </Nav>

          <Nav className="ms-auto social-icons">
            <Nav.Link href="mailto:jchenn412@gmail.com">
              <EmailRoundedIcon className="emailIcon" fontSize="medium" style={{color:'#F4F4F4'}}/>
            </Nav.Link>
            <Nav.Link href="https://github.com/jchen1124" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="medium" style={{color:'#F4F4F4'}} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/jason-chen-65a7452a0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon fontSize="medium"  style={{color:'#F4F4F4'}}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
