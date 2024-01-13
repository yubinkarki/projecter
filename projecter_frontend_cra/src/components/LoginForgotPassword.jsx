import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styles from "../assets/styles/page_styles/Login_Page.module.scss";

const LoginForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsFormInvalid(false);
    setEmailData("");
  };

  const handleResetSubmit = () => {
    console.log(emailData);
    handleEmptyError();
  };

  const handleEmptyError = () => {
    if (emailData === "") {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        disableRipple
        onClick={handleClickOpen}
        className={styles.forgotPasswordButton}
        style={{ textTransform: "none", color: "black" }}
      >
        <Typography>Forgot your password?</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here. We
            will send you a reset link to the provided email.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            name="password-reset-email"
            id="password-reset-email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setEmailData(e.target.value);
              setIsFormInvalid(false);
            }}
            error={isFormInvalid}
            helperText={isFormInvalid && "Can not be empty"}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ fontSize: "14px" }}
            type="reset"
          >
            Cancel
          </Button>

          <Button onClick={handleResetSubmit} style={{ fontSize: "14px" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginForgotPassword;
