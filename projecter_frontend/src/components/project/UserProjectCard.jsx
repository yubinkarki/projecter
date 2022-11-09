import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/component_styles/UserProjectCard.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import userProfile1 from "../../assets/images/users/user2.png";
import UserProjectModal from "./UserProjectModal";

const UserProjectCard = (props) => {
  const navigate = useNavigate();
  const [cardStatus, setCardStatus] = useState("overall");
  var memberImages = [...Array(props.memberCount).keys()].map((i) => i + 1);

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
              PM - {props.pm}
            </Typography>
            <Typography component="div" className={styles.taskDetails}>
              <div style={{ marginBottom: "4px" }}>Members</div>
              {memberImages.slice(0, 7).map((item, index) => (
                <img
                  src={userProfile1}
                  alt="user"
                  className={styles.img}
                  key={index}
                />
              ))}
            </Typography>
          </CardContent>
          <CardActions className={styles.footerDiv} justify="center">
            <UserProjectModal />
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default UserProjectCard;
