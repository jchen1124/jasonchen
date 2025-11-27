import "../styles/About.css";
import jasonImage from "../assets/jason2.jpg";

const techstack = ["Python", "React.js", "C++", "JavaScript"];

const About = () => {
  return (
    <div id="about">
      <div className="section-head">
        <span className="section-title">/ about me</span>
      </div>
      <div className="about-content">
        <div className="about-description">
          <p>
            I am currently a Junior at the University of Maryland, Baltimore
            County (UMBC), pursuing a Bachelor's degree in Computer Science and
            Math. Outside of academics, I enjoy lifting weights, playing
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
        </div>

        <div className="about-image">
            <img src={jasonImage} alt="Jason Chen"/>
        </div>
      </div>
    </div>
  );
};

export default About;
