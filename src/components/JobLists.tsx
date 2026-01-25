import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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
          <Typography>{children}</Typography>
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
    "U.S Army DevCom": {
      title: "Machine Learning Intern @",
      duration: "June 2025 - August 2025",
      desc: [
        "Optimized YOLOv8 models for the detection and classification of airborne objects, achieving an 18% increase in detection accuracy and a 12% reduction in false positives compared to baseline performance.",
        "Engineered automated preprocessing and annotation conversion pipelines (COCO to YOLO), which standardized 50K+ aerial images and reduced manual labeling errors by 30%",
        "Deployed lightweight computer vision models to airborne sensor platforms, ensuring 95% real-time reliability for high-speed data processing across electro-optical and event-based cameras.",
        "Streamlined data ingestion workflows by developing Python-based scripts to handle multi-source imagery, improving the efficiency of the model training lifecycle."
      ],
    },
    " Platinum Business Services LLC": {
      title: "Data Artificial Intelligence Intern @",
      duration: "February 2026 - May 2026",
      desc: [
        "***** STARTING SPRING 2026 *****",
      ],
    },
  };

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const jobs = Object.entries(Experience_data);
  console.log(jobs);

  return (
    <Box
      className="job-list-container"
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto", // Changed from 224
        minHeight: "400px", // Add minimum height
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {jobs.map((job, index) => (
          <Tab
            className="company-tab"
            label={job[0]}
            key={index}
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
