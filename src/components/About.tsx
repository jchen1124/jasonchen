import "../styles/About.css";
import FadeIn from "./FadeIn";
import jasonImage from "../assets/jason2.jpg";

const techstack = ["Python", "React", "Node.js", "JavaScript"];

const About = () => {
  return (
    <div id="about">
      <div className="section-head">
        <span className="section-title">/ About Me</span>
      </div>
      <div className="about-content">
        <div className="about-description">
          <FadeIn delay={100}>
            <p>
              I'm passionate about creating a variety of projects ranging from
              web development to data analysis, studying, exploring new
              technologies, and continuously improving my skills.
            </p>
            <p>
              Outside of academics, I enjoy lifting weights, playing
              basketball, and hiking
            </p>

            <div className="techStack-section">
              <p>Here are some technologies I've been working with: </p>

              <ul className="techStack">
                {techstack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="about-image">
          <img src={jasonImage} alt="Jason Chen" />
        </div>
      </div>
    </div>
  );
};

export default About;
