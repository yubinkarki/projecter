import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import TeamMemberCardDetails from "./TeamMemberCardDetails";
import styles from "../../assets/styles/component_styles/TeamMemberCard.module.scss";

const teamMembers = [
  {
    firstName: "Kurosaki",
    lastName: "Ichigo",
    designation: "Finance",
  },
  {
    firstName: "Mugiwara",
    lastName: "Luffy",
    designation: "Fullstack Developer",
  },
  {
    firstName: "Captain",
    lastName: "Nepal",
    designation: "Human Resource",
  },
  {
    firstName: "Iron",
    lastName: "Manchey",
    designation: "Marketing",
  },
];

const TeamMemberCard = () => {
  const navigate = useNavigate();

  return (
    <Grid item xlg={4} lg={4} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="standard" className={styles.taskCardMain}>
          <CardContent>
            <Typography gutterBottom className={styles.h2}>
              Team Members
            </Typography>

            <Typography component="div" className={styles.taskDetails}>
              {teamMembers.slice(0, 3).map((item, index) => (
                <TeamMemberCardDetails
                  key={index}
                  name={`${item.firstName} ${item.lastName}`}
                  designation={item.designation}
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
                navigate("/user/team");
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

export default TeamMemberCard;
