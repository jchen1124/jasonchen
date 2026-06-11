import { useState, type FormEvent } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import FadeIn from "./FadeIn";
import "../styles/Contact.css";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      (import.meta.env.DEV ? "http://localhost:3002" : "");

    setStatus("sending");

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message, website }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Error sending contact form:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="section-head">
        <span className="section-title">/ Contact Me</span>
      </div>

      <FadeIn delay={100}>
        <div className="contact-layout">
          <div className="contact-intro">
            <span className="contact-kicker">Let&apos;s connect</span>
            <h2>Feel free to reach out and send me a message anytime.</h2>
            <p>
              I&apos;m open to software engineering opportunities and
              collaborations where I can help build meaningful technology.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-honeypot" aria-hidden="true">
              <span>Website</span>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <div className="contact-field-row">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <div className="subject-field-row">
              <label>
                <span>Subject</span>
                <input
                  type="text"
                  name="subject"
                  autoComplete="off"
                  placeholder="What would you like to discuss?"
                  maxLength={150}
                  required
                />
              </label>
            </div>
 
            <label>
              <span>Message</span>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell me what you would like to build..."
                maxLength={5000}
                required
              />
            </label>

            <button
              type="submit"
              className="contact-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
              <ArrowOutwardIcon />
            </button>

            <div
              className={`contact-status contact-status-${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" &&
                "Message sent successfully. I will get back to you soon."}
              {status === "error" &&
                "The message could not be sent. Please try again shortly."}
            </div>
          </form>
        </div>
      </FadeIn>
    </section>
  );
};

export default Contact;
