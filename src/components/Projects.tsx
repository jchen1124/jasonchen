import { useState, useEffect } from "react";
import ProjectCard from "./Card"
import FadeIn from "./FadeIn";
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
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div id="projects">
      <div className="section-head">
        <span className="section-title">/ Projects</span>
      </div>
        <FadeIn delay={100}>
        <div className="projects-list">
            {projects.map((project) =>(
                <ProjectCard key={project._id.toString()} project={project}/>
            ))}
        </div>
        </FadeIn>
    </div>
  );
};
export default Projects;