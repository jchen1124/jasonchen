import umbcLogo from "../assets/umbc.jpg";
import "../styles/Education_Card.css";

const relevantCoureses = [
  "Data Structures and Algorithms",
  "Intro to AI",
  "Object Oriented Programming",
];

const Education_Card = () => {
  return (
    <div className="education-card">
      <div className="school-logo">
        <img src={umbcLogo} alt="UMBC Logo" />
      </div>
      <div className="education-details">
        <h2>University of Maryland, Baltimore County (UMBC)</h2>
        <h3>Computer Science and Mathematics</h3>
        <h4 className = "education-date">August 2023 - May 2027</h4>
        <ul className="relevant-courses">
          <h4>Relevant Courses:</h4>
          {relevantCoureses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Education_Card;
