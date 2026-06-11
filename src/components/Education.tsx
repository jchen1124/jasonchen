import Education_Card from "./Education_Card";
import FadeIn from "./FadeIn";
import "../styles/Education.css";

const Education = () => {
  return (
    <div id="education">
      <FadeIn>
        <div className="section-head">
          <span className="section-title">/ Education</span>
        </div>
      </FadeIn>

      <FadeIn delay={140}>
        <Education_Card />
      </FadeIn>
    </div>
  );
};

export default Education;
