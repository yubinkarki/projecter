import React from "react";
import styles from "../../assets/styles/component_styles/EventCardDetails.module.scss";
import { Box, Card, CardContent } from "@mui/material";

const EventCardDetails = (props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className={styles.detailsMainCard}>
        <CardContent className={styles.cardContent}>
          <div>
            <h3 className={styles.h3}>Tea talk with HR Manager and CTO</h3>

            <h4 className={styles.h4}>12th Sep, 2022</h4>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCardDetails;
