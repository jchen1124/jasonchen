import umbcLogo from "../assets/umbc.jpg";
import "../styles/Education_Card.css";

const relevantCourses = [
  "Data Structures and Algorithms",
  "Intro to AI",
  "Database Systems",
  "Software Development",
  "Object Oriented Programming",
];

const Education_Card = () => {
  return (
    <div className="education-card">
      <div className="school-logo">
        <img src={umbcLogo} alt="UMBC Logo" />
      </div>
      <div className="education-details">
        <h2 className="education-school">
          University of Maryland, Baltimore County (UMBC)
        </h2>
        <h3 className="education-major">Computer Science and Mathematics</h3>
        <p className="education-date">2023 - 2027 • GPA: 3.7</p>

        <div className="education-coursework">
          <span className="education-coursework-label">Coursework</span>
          <ul className="relevant-courses">
          {relevantCourses.map((course) => (
            <li key={course}>{course}</li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Education_Card;
