import Typist from "react-typist-component";
import FadeIn from "./FadeIn";
import jasonImage from "../assets/jason3.jpg";
import "../styles/intro.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const Intro = () => {
  const [init, setInit] = useState(false);

  // Initialize the tsParticles engine only once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load only the features you need (slim version is smaller)
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Particle configuration - memoized to prevent unnecessary re-renders
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false, // Particles only in the intro section
        zIndex: 1,
      },
      background: {
        color: {
          value: "transparent", // Use transparent so your CSS background shows
        },
      },
      fpsLimit: 120, // Frame rate limit
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push", // Adds particles on click
          },
          onHover: {
            enable: true,
            mode: "repulse", // Particles move away from cursor
          },
        },
        modes: {
          push: {
            quantity: 4, // Number of particles added on click
          },
          repulse: {
            distance: 150, // Distance particles repulse from cursor
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // White particles
        },
        links: {
          color: "#ffffff",
          distance: 150, // Distance to draw links between particles
          enable: true,
          opacity: 0.3, // Link opacity
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce", // Particles bounce off edges
          },
          random: false,
          speed: 1, // Particle speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200, // Number of particles
        },
        opacity: {
          value: 0.5, // Particle opacity
        },
        shape: {
          type: "circle", // Particle shape
        },
        size: {
          value: { min: 1, max: 5 }, // Particle size range
        },
      },
      detectRetina: true, // Better display on retina screens
    }),
    []
  );

  return (
    <div id="intro">
      {/* Render particles only after initialization */}
      {init && <Particles id="tsparticles" options={options} />}

      <div className="intro-content">
        <div className="intro-text">
          <Typist
            loop={false}
            hideCursorWhenDone
            cursor={<span className="cursor">|</span>}
          >
            <span className="intro-title">
              Hi, I'm <span className="intro-name">Jason</span>{" "}
            </span>
            <Typist.Delay ms={800} />
          </Typist>

          <div className="intro-typing-line" aria-live="polite">
            <Typist
              loop
              startDelay={1700}
              typingDelay={42}
              backspaceDelay={22}
              cursor={<span className="typing-cursor">|</span>}
            >
              {"Aspiring Software Engineer"}
              <Typist.Delay ms={1700} />
              <Typist.Backspace count={26} />
              <Typist.Delay ms={350} />
              {"Always Creating • Always Building • Always Learning"}
              <Typist.Delay ms={1700} />
              <Typist.Backspace count={51} />
              <Typist.Delay ms={350} />
              {
                "Experience with TypeScript, Python, Full-Stack Development, AI, and More"
              }
              <Typist.Delay ms={1700} />
              <Typist.Backspace count={72} />
              <Typist.Delay ms={350} />
              {"Seeking Opportunities to Build Meaningful Technology"}
              <Typist.Delay ms={1700} />
              <Typist.Backspace count={52} />
              <Typist.Delay ms={350} />
            </Typist>
          </div>

          <FadeIn>
            <div className="intro-description">
              Computer Science BS student with knowledge in Python, TypeScript, Cloud, React
              and Node.js. Welcome to my personal portfolio! I am currently
              seeking for Software Engineering, Machine Learning, and Data
              Science Internships.
            </div>
          </FadeIn>
        </div>

        <div className="intro-image">
          <img src={jasonImage} alt="Intro" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
