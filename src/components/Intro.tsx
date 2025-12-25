import Typist from "react-typist-component";
// import GeometricScene from "./Geometric";
import FadeIn from "./FadeIn";
import jasonImage from "../assets/jason2.jpg";
import "../styles/intro.css";

const Intro = () => {
  return (
    <div id="intro">
      <div className="intro-content">
        <div className="intro-text">
          <Typist loop={false} cursor={<span className="cursor">|</span>}>
            <span className="intro-title">
              Hi, I'm <span className="intro-name">Jason</span>{" "}
            </span>
            <Typist.Delay ms={800} />
          </Typist>
          <FadeIn>
            <div className="intro-description">
              Computer Science BS student with knowledge in Python, C++, React
              and Node.js. Welcome to my personal portfolio! I am currently
              seeking for Software Engineering, Machine Learning, and Data
              Science Internships.
            </div>
          </FadeIn>
        </div>

        <div className="intro-image">
          <img src={jasonImage} alt="Intro" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
