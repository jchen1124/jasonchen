import { useState, useEffect } from "react";
import ProjectCard from "./Card"
import "../styles/Projects.css";

interface Project {
  _id: string;
  title: string;
  desc: string;
  tech: string[];
  projectURL: string;
  image: string;
}


const Projects = () => {

  const [projects, setProjects] = useState<Project[]>([]);

// Fetch projects from the backend API
  useEffect(() => {
    fetch("http://localhost:3002/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div id="projects">
      <div className="section-head">
        <span className="section-title">/ projects</span>
      </div>
        <div className="projects-list">
            {projects.map((project) =>(
                <ProjectCard key={project._id.toString()} project={project}/>
            ))}
        </div>
    </div>
  );
};
export default Projects;