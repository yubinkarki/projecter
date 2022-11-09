import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/component_styles/UserTaskCard.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import userProfile1 from "../../assets/images/users/user2.png";
import UserTaskModal from "./UserTaskModal";

const UserTaskCard = (props) => {
  const navigate = useNavigate();
  const [cardStatus, setCardStatus] = useState("overall");

  return (
    <Grid item xlg={4} lg={4} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="standard" className={styles.taskCardMain}>
          <CardContent>
            <Typography gutterBottom className={styles.h2}>
              <FiberManualRecordIcon
                className={styles.icon}
                style={{
                  color:
                    props.status === "completed"
                      ? "green"
                      : props.status === "inprogress"
                      ? "orange"
                      : props.status === "assigned"
                      ? "teal"
                      : "grey",
                }}
              />
              {props.status === "completed"
                ? "Finished"
                : props.status === "inprogress"
                ? "In Progress"
                : "Assigned"}
            </Typography>
            <Typography component="div" className={styles.labelsDiv}>
              {props.title}
            </Typography>
            <Typography component="div" className={styles.h3}>
              Assigned by - {props.pm}
            </Typography>
            <Typography component="div" className={styles.taskDetails}>
              <div>Assigned to - {props.assignee}</div>
            </Typography>
          </CardContent>
          <CardActions className={styles.footerDiv} justify="center">
            <UserTaskModal />
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default UserTaskCard;
