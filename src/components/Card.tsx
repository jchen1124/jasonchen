// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../styles/card.css";

interface ProjectType {
  title: string;
  desc: string;
  tech: string[];
  projectURL: string;
  image: string;
  link: string
}

interface CardProps {
  project: ProjectType;
}

const ProjectCard = ({ project }: CardProps) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={`/assets/${project.image}`}
        alt={project.image}
      />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.desc}</Card.Text>
        <Card.Text>{project.tech.join(", ")}</Card.Text>
        <a
          href={project.projectURL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <GitHubIcon fontSize="medium" style={{ color: "#64ffda" }} />
        </a>

       {project.link &&(
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <ExitToAppIcon fontSize="medium" style={{ color: "#64ffda", marginLeft: '10px' }} />
        </a>
       )}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
