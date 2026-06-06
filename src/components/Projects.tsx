import { useState, useEffect } from "react";
import ProjectCard from "./Card";
import FadeIn from "./FadeIn";
import "../styles/Projects.css";

interface Project {
  _id: string;
  title: string;
  desc: string;
  tech: string[];
  projectURL: string;
  image: string;
  link: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");


  // Fetch projects from the backend API
  useEffect(() => {
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      (import.meta.env.DEV ? "http://localhost:3002" : "");

    fetch(`${apiUrl}/api/projects`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Projects request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError("Projects could not load right now.");
      });
  }, []);

  return (
    <div id="projects">
      <div className="section-head">
        <span className="section-title">/ Projects</span>
      </div>
      <FadeIn delay={100}>
        <div className="projects-list">
          {error && <p className="projects-error">{error}</p>}
          {projects.map((project) => (
            <ProjectCard key={project._id.toString()} project={project} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
export default Projects;
