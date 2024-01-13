import React from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import NoticeCardDetails from "./NoticeCardDetails";
import styles from "../../assets/styles/component_styles/NoticeCard.module.scss";

const NoticeCard = () => {
  return (
    <Grid item xlg={6} lg={6} md={6} sm={12} xs={12}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="standard" className={styles.taskCardMain}>
          <CardContent>
            <Typography className={styles.h2}>Notice</Typography>

            <Typography component="div" className={styles.taskDetails}>
              <NoticeCardDetails />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default NoticeCard;
