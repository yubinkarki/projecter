import React, { useState } from "react";
import Box from "@mui/material/Box";
import styles from "../../assets/styles/component_styles/ProjectMenu.module.scss";

const ProjectMenu = (props) => {
  const [projectState, setProjectState] = useState("all");

  const handleSetAll = () => {
    setProjectState("all");
    props.setAll();
  };

  const handleSetInProgress = () => {
    setProjectState("inprogress");
    props.setInProgress();
  };

  const handleSetCompleted = () => {
    setProjectState("completed");
    props.setCompleted();
  };

  return (
    <Box className={styles.mainBox}>
      {" "}
      <button
        className={styles.button}
        onClick={handleSetAll}
        style={{
          color: projectState === "all" && "#1f4583",
          textDecoration: projectState === "all" && "underline",
          textDecorationThickness: projectState === "all" && "2px",
          textUnderlineOffset: projectState === "all" && "8px",
        }}
      >
        Overall ({props.overallCount})
      </button>
      <button
        className={styles.button}
        onClick={handleSetInProgress}
        style={{
          color: projectState === "inprogress" && "#1f4583",
          textDecoration: projectState === "inprogress" && "underline",
          textDecorationThickness: projectState === "inprogress" && "2px",
          textUnderlineOffset: projectState === "inprogress" && "8px",
        }}
      >
        In Progress ({props.inProgressCount})
      </button>
      <button
        className={styles.button}
        onClick={handleSetCompleted}
        style={{
          color: projectState === "completed" && "#1f4583",
          textDecoration: projectState === "completed" && "underline",
          textDecorationThickness: projectState === "completed" && "2px",
          textUnderlineOffset: projectState === "completed" && "8px",
        }}
      >
        Completed ({props.completedCount})
      </button>
      <form className={styles.form}>
        <div>
          <input
            id="search"
            name="search"
            label="search"
            type="text"
            className={styles.search}
            placeholder={`Search ${props.searchPlaceHolder}`}
          />
        </div>
      </form>
    </Box>
  );
};

export default ProjectMenu;
