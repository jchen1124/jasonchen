import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/projectModel.js";

dotenv.config();

const app = express();
const productionOrigins = new Set([
  "https://jasonchen-sable.vercel.app",
  "https://jason-chen.dev",
  "https://www.jason-chen.dev",
]);

app.use(
  cors({
    origin(origin, callback) {
      const isLocalOrigin =
        origin &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

      if (!origin || isLocalOrigin || productionOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
); //allows different servers to communicate with each other
app.use(express.json({ limit: "20kb" })); //allows us to parse JSON data in the request body
const PORT = 3002;
const contactAttempts = new Map();

console.log("🔥 server.js is running!");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

//GET request to fetch all projects
app.get("/api/projects", async (req, res) => {
  // console.log("Received request for /api/projects");
  try {
    // console.log("Connected DB name:", mongoose.connection.db.databaseName);
    const projects = await Project.find().sort({ order: 1 });
    console.log("Found projects:", projects);
    res.json(projects);
  } catch (err) {
    console.log("Error fetching projects:", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message, website } = req.body;

  if (website) {
    res.json({ message: "Message sent" });
    return;
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim() ||
    name.length > 100 ||
    email.length > 200 ||
    subject.length > 150 ||
    message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    res.status(400).json({ message: "Please provide valid contact details." });
    return;
  }

  const requestKey = req.ip || "unknown";
  const now = Date.now();
  const recentAttempts = (contactAttempts.get(requestKey) || []).filter(
    (timestamp) => now - timestamp < 10 * 60 * 1000,
  );

  if (recentAttempts.length >= 3) {
    res.status(429).json({ message: "Please wait before sending again." });
    return;
  }

  contactAttempts.set(requestKey, [...recentAttempts, now]);

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error("Contact email service is not configured.");
    res.status(503).json({ message: "Contact service is unavailable." });
    return;
  }

  const escapeHtml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  const cleanSubject = subject.trim().replace(/[\r\n]+/g, " ");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "Portfolio Contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL],
        reply_to: email.trim(),
        subject: `Portfolio contact: ${cleanSubject}`,
        text: `Subject: ${cleanSubject}\n\n${message.trim()}\n\nFrom: ${name.trim()}\nEmail: ${email.trim()}`,
        html: `
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
          <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message.trim()).replaceAll("\n", "<br />")}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text();
      console.error("Resend API error:", emailError);
      res.status(502).json({ message: "Email delivery failed." });
      return;
    }

    res.json({ message: "Message sent" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ message: "Email delivery failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
