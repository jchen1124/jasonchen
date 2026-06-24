import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
  title: String,
  desc: String,
  tech: [String],
  projectURL: String,
  image: String,
  link: String,
  isHackathon: Boolean,
});

//creates a model named 'projects' using the projectsSchemema
const Project = mongoose.model("Project", projectsSchema);

export default Project;
