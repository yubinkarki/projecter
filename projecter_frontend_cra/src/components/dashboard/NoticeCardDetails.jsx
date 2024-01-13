import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import styles from "../../assets/styles/component_styles/NoticeCardDetails.module.scss";

const NoticeCardDetails = (props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className={styles.detailsMainCard}>
        <CardContent className={styles.cardContent}>
          <div>
            <h3 className={styles.h3}>
              Make task and project models in mongoose
            </h3>

            <h4 className={styles.h4}>Tom Cruise</h4>
          </div>

          <div>
            <h4 className={styles.h4}>14th Sep, 2022</h4>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoticeCardDetails;
