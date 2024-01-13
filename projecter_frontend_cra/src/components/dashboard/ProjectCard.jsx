import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import ProjectCardDetails from "./ProjectCardDetails";
import styles from "../../assets/styles/component_styles/TaskCard.module.scss";

const projectData = [
  {
    id: 1,
    title: "Project Management System",
    status: "inprogress",
    dueDate: "15th Oct, 2022",
  },
  {
    id: 2,
    title: "Task Recording System",
    status: "completed",
    dueDate: "23rd Oct, 2022",
  },
  {
    id: 3,
    title: "Health Checker",
    status: "completed",
    dueDate: "4th Nov, 2022",
  },
  {
    id: 4,
    title: "Personal Digital Wallet",
    status: "completed",
    dueDate: "10th Nov, 2022",
  },
  {
    id: 5,
    title: "Traffic Data Analysis",
    status: "completed",
    dueDate: "21st Nov, 2022",
  },
];

const ProjectCard = (props) => {
  const navigate = useNavigate();
  const [cardStatus, setCardStatus] = useState("overall");

  return (
    <Grid item xlg={4} lg={4} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="standard" className={styles.taskCardMain}>
          <CardContent>
            <Typography gutterBottom className={styles.h2}>
              Projects
            </Typography>

            <Typography component="div" className={styles.labelsDiv}>
              <button
                className={styles.button}
                onClick={() => {
                  setCardStatus("overall");
                }}
                style={{
                  color: cardStatus === "overall" && "#1f4583",
                  textDecoration: cardStatus === "overall" && "underline",
                  textDecorationThickness: cardStatus === "overall" && "2px",
                  textUnderlineOffset: cardStatus === "overall" && "8px",
                }}
              >
                Overall
              </button>

              <button
                className={styles.button}
                onClick={() => {
                  setCardStatus("todo");
                }}
                style={{
                  color: cardStatus === "todo" && "#1f4583",
                  textDecoration: cardStatus === "todo" && "underline",
                  textDecorationThickness: cardStatus === "todo" && "2px",
                  textUnderlineOffset: cardStatus === "todo" && "8px",
                }}
              >
                Todo
              </button>
            </Typography>

            <Typography component="div" className={styles.taskDetails}>
              {cardStatus === "todo"
                ? projectData
                    .filter(
                      (value) =>
                        value.status === "inprogress" ||
                        value.status === "assigned"
                    )
                    .slice(0, 2)
                    .map((item, index) => (
                      <ProjectCardDetails
                        key={index}
                        title={item.title}
                        status={item.status}
                        date={item.dueDate}
                      />
                    ))
                : projectData
                    .slice(0, 2)
                    .map((item, index) => (
                      <ProjectCardDetails
                        key={index}
                        title={item.title}
                        status={item.status}
                        date={item.dueDate}
                      />
                    ))}
            </Typography>
          </CardContent>

          <CardActions className={styles.footerDiv} justify="center">
            <Button
              variant="standard"
              className={styles.link}
              style={{ textTransform: "none" }}
              onClick={() => {
                navigate("/user/project");
              }}
            >
              View More
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default ProjectCard;
