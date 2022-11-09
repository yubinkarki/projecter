import React from "react";
import styles from "../../assets/styles/component_styles/TeamMemberCardDetails.module.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import user1 from "../../assets/images/users/user1.png";

const TeamMemberCardDetails = (props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className={styles.mainCard}>
        <CardContent className={styles.cardContent}>
          <div className={styles.imgDiv}>
            <img src={user1} className={styles.img} alt="user" />
          </div>
          <div>
            <h3 className={styles.h3}>{props.name}</h3>
            <h4 className={styles.h4}>{props.designation}</h4>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TeamMemberCardDetails;
