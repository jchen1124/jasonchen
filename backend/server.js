import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Project from './models/Projects.js';

dotenv.config();

const app = express();
app.use(cors()); //allows different servers to communicate with each other
app.use(express.json()); //allows us to parse JSON data in the request body
const PORT = 3001;

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.log(error))

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })
