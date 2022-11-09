import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { BsArrowLeftCircle } from "react-icons/bs";
import styles from "../../assets/styles/component_styles/ChangePasswordForm.module.scss";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import changePasswordAction from "../../redux/actions/ChangePasswordAction";
import { ToastContainer } from "react-toastify";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(5, "Minimum 5 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Password doesn't match"
        ),
      }),
  });

  const handlePasswordChange = (values) => {
    const passwordChangeData = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    dispatch(changePasswordAction(passwordChangeData));
  };

  return (
    <div className={styles.mainDiv}>
      <Card variant="standard" className={styles.mainCard}>
        <div className={styles.topSection}>
          <Link to={`/${role}/profile`} className={styles.topSectionLink}>
            <button type="button" className={styles.topSectionButton}>
              <BsArrowLeftCircle />
            </button>
          </Link>
        </div>
        <Grid item>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={handlePasswordChange}
          >
            {({ errors, touched, handleChange, handleSubmit }) => (
              <form className={styles.profileForm}>
                <div className={styles.leftForm}>
                  <div className={styles.inputDiv}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <br />
                    <input
                      type="password"
                      name="currentPassword"
                      defaultValue=""
                      required
                      className={styles.input}
                      onChange={handleChange("currentPassword")}
                    />
                    {errors.currentPassword && touched.currentPassword ? (
                      <div className={styles.errorDiv}>
                        {errors.currentPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.inputDiv}>
                    <label htmlFor="newPassword">New Password</label>
                    <br />
                    <input
                      type="password"
                      name="newPassword"
                      defaultValue=""
                      required
                      className={styles.input}
                      onChange={handleChange("newPassword")}
                    />
                    {errors.newPassword && touched.newPassword ? (
                      <div className={styles.errorDiv}>
                        {errors.newPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.inputDiv}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <br />
                    <input
                      type="password"
                      name="confirmPassword"
                      defaultValue=""
                      required
                      className={styles.input}
                      onChange={handleChange("confirmPassword")}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className={styles.errorDiv}>
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="contained"
                  className={styles.saveButton}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
          <ToastContainer position="top-right" autoClose={3000} />
        </Grid>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
