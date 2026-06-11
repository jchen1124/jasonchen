import "../styles/Experience.css"
import JobLists from "./JobLists";
import FadeIn from "./FadeIn";

const Experience = () => {
    return (
        <div id="experience">
            <FadeIn>
                <div className="section-head">
                    <span className="section-title">/ Experience</span>
                </div>
            </FadeIn>

            <FadeIn delay={140}>
                <JobLists/>
            </FadeIn>
        </div>
    )
}

export default Experience;
