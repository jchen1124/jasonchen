import Typist from "react-typist-component";
import GeometricScene from "./Geometric";
import "../styles/intro.css";

const Intro = () => {
  return (
    <div id="intro">
      <GeometricScene />
        <Typist loop={false} cursor={<span className="cursor">|</span>}>
          <span className="intro-title">
            Hello, I'm <span className="intro-name">Jason</span>{" "}
          </span>
          <Typist.Delay ms={800} />
        </Typist>
        <div className="intro-description">
          I'm an aspiring software engineer from Maryland. I am passionate about
          building impactful software solutions and continuously learning new
          technologies.
        </div>
    </div>
  );
};

export default Intro;