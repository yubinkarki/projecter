import React from "react";
import styles from "../../assets/styles/component_styles/NoticeCard.module.scss";
import NoticeCardDetails from "./NoticeCardDetails";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
