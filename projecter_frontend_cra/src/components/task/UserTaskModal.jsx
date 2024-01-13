import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import userProfile1 from "../../assets/images/users/user1.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../assets/styles/modal_styles/UserTaskModal.module.scss";

const UserTaskModal = () => {
  const statusOptions = ["In Progress", "Completed"];
  const [statusSelectOption, setStatusSelectOption] = useState("inprogress");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (e) => {
    setStatusSelectOption(e.target.value.toLowerCase().split(" ").join(""));
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
                <div className={styles.heading}>
                  Complete design layout for profile page
                </div>
                <div className={styles.subHeading}>
                  <div className={styles.calendar}>
                    <CalendarMonthOutlinedIcon />
                    <p>
                      <span style={{ fontWeight: "500" }}>Due Date:</span> 26th
                      Sep, 2022
                    </p>
                  </div>
                </div>
                <Typography component="div">
                  <p
                    style={{
                      fontWeight: "500",
                      fontSize: "1.05rem",
                      marginBottom: "-2px",
                      marginTop: "5px",
                    }}
                  >
                    Assigned by
                  </p>
                  <div className={styles.assigner}>
                    <img
                      src={userProfile1}
                      alt="assigner"
                      className={styles.img}
                    />
                    <p>Yamamoto Taicho</p>
                  </div>
                </Typography>
                <Typography component="div">
                  <p
                    style={{
                      fontWeight: "500",
                      fontSize: "1.05rem",
                      marginBottom: "-2px",
                      marginTop: "5px",
                    }}
                  >
                    Assigned to
                  </p>
                  <div className={styles.assigner}>
                    <img
                      src={userProfile1}
                      alt="assigner"
                      className={styles.img}
                    />
                    <p>Yubin Karki</p>
                  </div>
                </Typography>
                <Typography component="div" className={styles.taskDetails}>
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "1.05rem",
                      marginBottom: "2px",
                      marginTop: "10px",
                    }}
                  >
                    Status
                  </div>
                  <form className={styles.form}>
                    <Select
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          outline: "none",
                          border: "none",
                        },
                      }}
                      className={`"select" ${styles.select}`}
                      onChange={handleOptionChange}
                      value={statusSelectOption}
                      style={{
                        backgroundColor:
                          statusSelectOption === "assigned"
                            ? "#abf2f5"
                            : statusSelectOption === "inprogress"
                            ? "rgb(252, 210, 95)"
                            : statusSelectOption === "completed"
                            ? "#53e773"
                            : "white",
                      }}
                    >
                      <MenuItem
                        key="assigned"
                        value={statusSelectOption}
                        disabled
                      >
                        {statusSelectOption === "assigned"
                          ? "Assigned"
                          : statusSelectOption === "inprogress"
                          ? "In Progress"
                          : statusSelectOption === "completed"
                          ? "Completed"
                          : "N/A"}
                      </MenuItem>
                      {statusOptions.map(
                        (item) =>
                          item.toLowerCase().split(" ").join("") !==
                            statusSelectOption && (
                            <MenuItem
                              key={item.toLowerCase().split(" ").join("")}
                              value={item.toLowerCase().split(" ").join("")}
                            >
                              {item}
                            </MenuItem>
                          )
                      )}
                    </Select>
                  </form>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Dialog>
    </div>
  );
};

export default UserTaskModal;
