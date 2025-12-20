import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 ">
      <div className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0 ">
          © 2025 Jason Chen. All rights reserved.
        </span>
      </div>
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex gap-3">
        <li>
          <a 
            href="https://github.com/jchen1124" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon style={{ color: '#F4F4F4' }} />
          </a>
        </li>
        <li>
          <a 
            href="https://www.linkedin.com/in/jason-chen-65a7452a0/" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon style={{ color: '#F4F4F4' }} />
          </a>
        </li>
        <li>
          <a 
            href="mailto:jchenn412@gmail.com"
            aria-label="Email"
          >
            <EmailIcon style={{ color: '#F4F4F4' }} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;