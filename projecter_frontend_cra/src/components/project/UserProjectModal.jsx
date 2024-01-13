import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import userProfile1 from "../../assets/images/users/user2.png";
import styles from "../../assets/styles/modal_styles/UserProjectModal.module.scss";

const UserProjectModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="standard"
        className={styles.link}
        style={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: "300px",
            width: "450px",
          },
        }}
      >
        <Grid item xlg={12} lg={12} md={12} sm={12} className={styles.mainGrid}>
          <Box sx={{ minWidth: 275 }} className={styles.mainBox}>
            <Card variant="standard" className={styles.taskCardMain}>
              <CardContent>
                <Typography gutterBottom className={styles.h2}>
                  <button className={styles.button} onClick={handleClose}>
                    <CloseIcon className={styles.icon} />
                  </button>
                </Typography>
                <div className={styles.heading}>Project Management System</div>
                <div className={styles.subHeading}>
                  <div className={styles.calendar}>
                    <CalendarMonthOutlinedIcon />
                    <p>
                      <span style={{ fontWeight: "500" }}>Due Date:</span> 26th
                      Sep, 2022
                    </p>
                  </div>
                  <div className={styles.status}>
                    <p>
                      <span style={{ fontWeight: "500" }}>Status:</span>{" "}
                      <span style={{ color: "orange" }}>In Progress</span>
                    </p>
                  </div>
                </div>
                <Typography component="div" className={styles.labelsDiv}>
                  <p
                    style={{
                      fontWeight: "500",
                      fontSize: "1.05rem",
                      marginBottom: "-12px",
                      marginTop: "10px",
                    }}
                  >
                    Description
                  </p>
                  <p>
                    This application is used to manage client projects and it's
                    related tasks. There are 3 different levels of users each
                    with their own set of fucntions.
                  </p>
                </Typography>
                <Typography component="div" className={styles.taskDetails}>
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "1.05rem",
                      marginBottom: "10px",
                    }}
                  >
                    Members
                  </div>
                  <div className={styles.memberDetails}>
                    {" "}
                    <div className={styles.userDiv}>
                      <img
                        src={userProfile1}
                        alt="user"
                        className={styles.img}
                      />
                      <div className={styles.userName}>
                        <span style={{ fontWeight: "500" }}>Yubin Karki</span>
                        <span>Fullstack Developer</span>
                      </div>
                    </div>
                    <div className={styles.userDiv}>
                      <img
                        src={userProfile1}
                        alt="user"
                        className={styles.img}
                      />
                      <div className={styles.userName}>
                        <span style={{ fontWeight: "500" }}>Yubin Karki</span>
                        <span>Fullstack Developer</span>
                      </div>
                    </div>
                    <div className={styles.userDiv}>
                      <img
                        src={userProfile1}
                        alt="user"
                        className={styles.img}
                      />
                      <div className={styles.userName}>
                        <span style={{ fontWeight: "500" }}>Yubin Karki</span>
                        <span>Fullstack Developer</span>
                      </div>
                    </div>
                    <div className={styles.userDiv}>
                      <img
                        src={userProfile1}
                        alt="user"
                        className={styles.img}
                      />
                      <div className={styles.userName}>
                        <span style={{ fontWeight: "500" }}>Yubin Karki</span>
                        <span>Fullstack Developer</span>
                      </div>
                    </div>
                    <div className={styles.userDiv}>
                      <img
                        src={userProfile1}
                        alt="user"
                        className={styles.img}
                      />
                      <div className={styles.userName}>
                        <span style={{ fontWeight: "500" }}>Yubin Karki</span>
                        <span>Fullstack Developer</span>
                      </div>
                    </div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Dialog>
    </div>
  );
};

export default UserProjectModal;
