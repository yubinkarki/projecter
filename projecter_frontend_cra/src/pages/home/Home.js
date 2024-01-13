import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import styles from "../../assets/styles/page_styles/Home_Page.module.scss";
import { Link } from "react-router-dom";
import { RiExternalLinkFill } from "react-icons/ri";

const Home = () => {
  useEffect(() => {
    document.title = "Projecter - Home";
  });

  return (
    <div className={styles.mainDiv}>
      <Grid
        container
        alignItems="center"
        justifyContent="left"
        textAlign="center"
      >
        <Grid item lg={6} md={6} sm={12} xs={12} className={styles.heading}>
          <h1 className={styles.h1_top}>
            Welcome to <strong>Projecter</strong> - A complete project
            management solution
          </h1>

          <p className={styles.p_top}>Let's get you started.</p>

          <p className={styles.link_top}>
            <Link to="/login">Click here</Link>

            <RiExternalLinkFill className={styles.link_icon} />
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
