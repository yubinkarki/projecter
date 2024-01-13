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
import TaskCardDetails from "./TaskCardDetails";
import styles from "../../assets/styles/component_styles/TaskCard.module.scss";

const taskData = [
  {
    title: "Complete design layout for profile page",
    dueDate: "4th Sep, 2022",
    status: "completed",
  },
  {
    title: "Make task and project models in mongoose",
    dueDate: "14th Sep, 2022",
    status: "inprogress",
  },
  {
    title: "Integrate change password function",
    dueDate: "26th Sep, 2022",
    status: "inprogress",
  },
  {
    title: "Change profile image feature in edit section",
    dueDate: "4th Oct, 2022",
    status: "assigned",
  },
];

const TaskCard = () => {
  const navigate = useNavigate();
  const [cardStatus, setCardStatus] = useState("overall");

  return (
    <Grid item xlg={4} lg={4} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="standard" className={styles.taskCardMain}>
          <CardContent>
            <Typography gutterBottom className={styles.h2}>
              Tasks
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
                ? taskData
                    .filter(
                      (value) =>
                        value.status === "inprogress" ||
                        value.status === "assigned"
                    )
                    .slice(0, 2)
                    .map((item, index) => (
                      <TaskCardDetails
                        key={index}
                        title={item.title}
                        status={item.status}
                        date={item.dueDate}
                      />
                    ))
                : taskData
                    .slice(0, 2)
                    .map((item, index) => (
                      <TaskCardDetails
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
                navigate("/user/task");
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

export default TaskCard;
