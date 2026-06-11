import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/Navbar.css";
import jasonLogo from "../assets/jason_logo.jpg";

const navItems = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [suppressHover, setSuppressHover] = useState(false);

  useEffect(() => {
    const sectionIds = [...navItems.map(({ id }) => id), "contact"];
    let animationFrame = 0;

    const updateActiveSection = () => {
      const navbarHeight =
        document.querySelector<HTMLElement>(".site-navbar")?.offsetHeight ?? 90;
      const viewportMarker = navbarHeight + 24;
      const markerPosition = window.scrollY + viewportMarker;
      let currentSection = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) {
          return;
        }

        const sectionPosition =
          section.getBoundingClientRect().top + window.scrollY;

        if (sectionPosition <= markerPosition) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    const scheduleUpdate = () => {
      setSuppressHover(true);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <Navbar
      fixed="top"
      className={`site-navbar ${suppressHover ? "suppress-nav-hover" : ""}`}
      onMouseMove={() => setSuppressHover(false)}
    >
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
            {navItems.map(({ id, label }) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="ms-auto social-icons">
            <Nav.Link
              href="#contact"
              className={`contact-nav-button ${
                activeSection === "contact" ? "active" : ""
              }`}
              aria-current={activeSection === "contact" ? "page" : undefined}
            >
              Contact Me
            </Nav.Link>
            <Nav.Link
              className="social-icon-link"
              href="https://github.com/jchen1124"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="medium" style={{ color: "#F4F4F4" }} />
            </Nav.Link>
            <Nav.Link
              className="social-icon-link"
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
