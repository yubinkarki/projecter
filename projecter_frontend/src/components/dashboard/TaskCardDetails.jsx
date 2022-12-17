import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import styles from "../../assets/styles/component_styles/TaskCardDetails.module.scss";

const TaskCardDetails = (props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className={styles.detailsMainCard}>
        <CardContent className={styles.cardContent}>
          <div>
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
          </div>

          <div>
            <h3 className={styles.h3}>{props.title}</h3>

            <h4 className={styles.h4}>{props.date}</h4>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskCardDetails;
