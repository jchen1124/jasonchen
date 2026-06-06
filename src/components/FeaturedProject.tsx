import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface FeaturedProjectType {
  title: string;
  desc: string;
  tech: string[];
  projectURL: string;
  image: string;
  link: string;
}

interface FeaturedProjectProps {
  project: FeaturedProjectType;
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

const FeaturedProject = ({
  project,
  current,
  total,
  onPrevious,
  onNext,
}: FeaturedProjectProps) => {
  return (
    <article className="featured-project">
      <div className="featured-project-media">
        <img
          src={`/assets/${project.image}`}
          alt={`${project.title} project preview`}
        />
        <span className="featured-project-index">
          {String(current + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="featured-project-content">
        <span className="featured-project-label">Featured project</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <ul className="featured-project-tech" aria-label="Technologies used">
          {project.tech.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="featured-project-footer">
          <div className="featured-project-links">
            <a
              href={project.projectURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
              title="View source code"
            >
              <GitHubIcon />
            </a>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live project`}
                title="Open live project"
              >
                <OpenInNewIcon />
              </a>
            )}
          </div>

          {total > 1 && (
            <div className="featured-project-controls">
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous featured project"
                title="Previous project"
              >
                <ChevronLeftIcon />
              </button>
              <span>
                {current + 1} / {total}
              </span>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next featured project"
                title="Next project"
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeaturedProject;
