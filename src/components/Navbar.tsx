import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/Navbar.css";
import jasonLogo from "../assets/jason_logo.jpg";

const NavBar = () => {
  return (
    <Navbar fixed="top" className="site-navbar">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={jasonLogo}
            alt="Jason Chen Logo"
            style={{
              height: "45px",
              width: "45px",
              marginRight: "10px",
              borderRadius: "6px",
              objectFit: "cover",
              verticalAlign: "middle",
            }}
          />
          <span className="navbar-name">
            <span className="navbar-first">Jason</span>
            <span className="navbar-last">Chen</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links gap-4">
            {/* <Nav.Link href="#intro">Home</Nav.Link> */}
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#experience">Experience</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
          </Nav>

          <Nav className="ms-auto social-icons">
            <Nav.Link href="mailto:jchenn412@gmail.com">
              <EmailRoundedIcon
                className="emailIcon"
                fontSize="medium"
                style={{ color: "#F4F4F4" }}
              />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/jchen1124"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="medium" style={{ color: "#F4F4F4" }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/jason-chen-65a7452a0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon fontSize="medium" style={{ color: "#F4F4F4" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
