// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import GitHubIcon from "@mui/icons-material/GitHub";

interface ProjectType {
  title: string;
  desc: string;
  tech: string[];
  projectURL: string;
  image: string;
}

interface CardProps {
  project: ProjectType;
}

const ProjectCard = ({ project }: CardProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`/assets/${project.image}`}
        alt={project.image}
      />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.desc}</Card.Text>
        <a
          href={project.projectURL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <GitHubIcon fontSize="medium" style={{ color: "#64ffda" }} />
        </a>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
