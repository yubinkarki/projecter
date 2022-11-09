import React from "react";
import styles from "../../assets/styles/component_styles/TaskCardDetails.module.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ProjectCardDetails = (props) => {
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

export default ProjectCardDetails;
