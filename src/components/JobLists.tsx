import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import "../styles/JobLists.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className="job-panel-content">{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const JobLists = () => {
  const Experience_data = {
    "Davis Unlimited Information Technologies": {
      title: "Software Engineer Intern @",
      duration: "June 2026 - August 2026",
      desc: [
        "Built and maintained GitLab CI/CD pipelines for a Python application, automating Pytest testing and deployments to an AWS EC2 instance.",
        "Troubleshot and fixed issues across local development, CI pipelines, and AWS deployment environments to improve reliability.",
        "Built an embedding-based CUI retrieval system using Ollama embeddings to provide the LLM with relevant category context before classification, improving the consistency of predictions.",
      ],
    },
    "U.S Army DevCom": {
      title: "Software Engineer Intern @",
      duration: "June 2025 - August 2025",
      desc: [
        "Fine-tuned and validated YOLOv8 detection models on security-focused aerial datasets, improving detection accuracy by 18% while meeting real-time latency and power constraints on airborne sensor platforms.",
        "Developed automated data processing and training pipelines for 50K+ multi-source aerial images, standardizing COCO → YOLO annotations, reducing labeling errors by 30%, and cutting experiment turnaround time by 50%.",
        "Optimized inference deployment for electro-optical and event-based cameras, profiling model performance to achieve under 100ms per-frame latency on resource-constrained airborne hardware.",
      ],
    },
    "Platinum Business Services LLC": {
      title: "Data Artificial Intelligence Intern @",
      duration: "February 2026 - May 2026",
      desc: [
        "Researched and prototyped AI-driven simulation approaches for modeling complex drug diffusion and biological interaction systems.",
        "Investigated surrogate neural network and digital twin architectures to improve scalability and reduce computational overhead in large-scale simulation environments.",
        "Architecting a bidirectional data pipeline that integrates genomic resistance models with active simulations, enabling automated, real-time feedback loops and dynamic state management.",
      ],
    },
  };

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const jobs = Object.entries(Experience_data);

  return (
    <Box
      className="job-list-container"
      sx={{
        flexGrow: 1,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Experience companies"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minWidth: 250,
          width: 250,
          flexShrink: 0,
        }}
      >
        {jobs.map((job, index) => (
          <Tab
            className="company-tab"
            label={job[0]}
            key={index}
            disableRipple
            {...a11yProps(index)}
          ></Tab>
        ))}
      </Tabs>
      {jobs.map((job, index) => (
        <TabPanel value={value} index={index} key={index}>
          <span className="job-title">{job[1].title + " "}</span>
          <span className="company-name">{job[0]}</span>
          <br />
          <span className="job-duration">{job[1].duration}</span>
          <ul className="job-desc-list">
            {job[1].desc.map((desc, index) => (
              <li key={index} className="job-desc-item">
                {desc}
              </li>
            ))}
          </ul>
        </TabPanel>
      ))}
    </Box>
  );
};

export default JobLists;
