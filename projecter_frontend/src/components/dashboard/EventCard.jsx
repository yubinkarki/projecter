import React from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import EventCardDetails from "./EventCardDetails";
import styles from "../../assets/styles/component_styles/EventCard.module.scss";

const EventCard = () => {
  const date = new Date();
  let resultingDate = [("0" + date.getDate()).slice(-2)];
  let todayDate =
    date.getFullYear().toString() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    resultingDate;

  for (let i = 1; i <= 5; i++) {
    let result = date.setDate(date.getDate() + 1); // Get tomorrow's date of the next 5 days.
    result = new Date(result).getDate();
    let newResult = ("0" + result).slice(-2); // Add 0 to single digit date.
    resultingDate.push(newResult);
  }

  return (
    <Grid item xlg={6} lg={6} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="standard" className={styles.taskCardMain}>
          <CardContent>
            <Typography className={styles.h2}>Events</Typography>

            <Typography component="div" className={styles.labelsDiv}>
              Today's date: {todayDate}
            </Typography>

            <Typography component="div" className={styles.taskDetails}>
              <EventCardDetails />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default EventCard;
