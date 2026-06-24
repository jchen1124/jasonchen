import { useState, useEffect } from "react";
import ProjectCard from "./Card";
import FeaturedProject from "./FeaturedProject";
import FadeIn from "./FadeIn";
import "../styles/Projects.css";

interface Project {
  _id: string;
  title: string;
  desc: string;
  tech: string[];
  projectURL: string;
  image: string;
  link: string;
  isHackathon: boolean
}

const featuredProjectTitles = new Set(["Geo Gallery"]);

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);


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

  const featuredProjects = projects.filter((project) =>
    featuredProjectTitles.has(project.title)
  );
  const standardProjects = projects.filter(
    (project) => !featuredProjectTitles.has(project.title)
  );
  const activeFeaturedProject = featuredProjects[featuredIndex];

  const showPreviousFeaturedProject = () => {
    setFeaturedIndex((current) =>
      current === 0 ? featuredProjects.length - 1 : current - 1
    );
  };

  const showNextFeaturedProject = () => {
    setFeaturedIndex((current) => (current + 1) % featuredProjects.length);
  };

  return (
    <div id="projects">
      <div className="section-head">
        <span className="section-title">/ Projects</span>
      </div>
      <FadeIn delay={100}>
        {activeFeaturedProject && (
          <div className="featured-project-stage">
            <FeaturedProject
              project={activeFeaturedProject}
              current={featuredIndex}
              total={featuredProjects.length}
              onPrevious={showPreviousFeaturedProject}
              onNext={showNextFeaturedProject}
            />
          </div>
        )}

        <div className="projects-list">
          {error && <p className="projects-error">{error}</p>}
          {standardProjects.map((project) => (
            <ProjectCard key={project._id.toString()} project={project} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
export default Projects;
