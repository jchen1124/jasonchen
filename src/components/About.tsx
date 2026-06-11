import "../styles/About.css";
import FadeIn from "./FadeIn";
import jasonImage from "../assets/basketball.jpg";

const techstack = ["Python", "React", "Node.js", "TypeScript"];

const About = () => {
  return (
    <div id="about">
      <FadeIn>
        <div className="section-head">
          <span className="section-title">/ About Me</span>
        </div>
      </FadeIn>

      <div className="about-content">
        <FadeIn
          className="about-description"
          direction="left"
          delay={100}
        >
          <p>
            I'm passionate about creating a variety of projects, studying,
            exploring new technologies, and continuously improving my skills.
          </p>
          <p>
            Outside of academics, I enjoy lifting weights, playing basketball,
            and hiking
          </p>

          <div className="techStack-section">
            <p>Here are some technologies I've been working with: </p>

            <ul className="techStack">
              {techstack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn className="about-image" direction="right" delay={100}>
          <img src={jasonImage} alt="Jason Chen" />
        </FadeIn>
      </div>
    </div>
  );
};

export default About;
