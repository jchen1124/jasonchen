import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/projectModel.js";

dotenv.config();

const app = express();
app.use(cors()); //allows different servers to communicate with each other
app.use(express.json()); //allows us to parse JSON data in the request body
const PORT = 3002;

console.log("🔥 server.js is running!");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

//GET request to fetch all projects
app.get("/api/projects", async (req, res) => {
  console.log("Received request for /api/projects");
  try {
    console.log("Connected DB name:", mongoose.connection.db.databaseName);
    const projects = await Project.find();
    console.log("Found projects:", projects);
    res.json(projects);
  } catch (err) {
    console.log("Error fetching projects:", err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
