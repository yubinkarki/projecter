import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import signupAction from "../../redux/actions/SignupAction";
import { Grid, TextField, Button, MenuItem, Select } from "@mui/material";
import { TiArrowBackOutline } from "react-icons/ti";
import styles from "../../assets/styles/page_styles/Signup_Page.module.scss";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup";
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Incorrect email format")
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[a-z._-]{1,12}\.com$/,
        "Email pattern is not correct"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Minimum 5 characters"), //.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string()
      .required("Please confirm password")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password doesn't match"
        ),
      }),
    phoneNumber: Yup.string()
      .required("Please enter your phone number")
      .min(10, "Minimum 10 characters required")
      .max(14, "Maximum 14 characters allowed")
      .matches(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
        "Phone number is not valid"
      ),
    designation: Yup.string().required("Select one designation"),
  });

  const handleFormSubmit = (values) => {
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      designation: values.designation,
    };

    dispatch(signupAction(userData));

    setTimeout(() => {
      const signup = localStorage.getItem("signup");

      if (signup) {
        navigate("/login");

        setTimeout(() => {
          toast.success(
            <div style={{ textAlign: "left", paddingLeft: "5%" }}>
              User created successfully
              <br />
              Please login to continue
            </div>
          );
        }, 400);

        localStorage.removeItem("signup");
      }
    }, 500);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    document.getElementById("signupForm").reset();
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      className={styles.mainContainer}
    >
      <Grid
        item
        xlg={4}
        lg={4}
        md={6}
        sm={10}
        xs={12}
        className={styles.signupForm}
      >
        <div className={styles.formHeader}>
          <Link to="/login" style={{ color: "rgb(34, 34, 34)" }}>
            <TiArrowBackOutline
              style={{ fontSize: "1.5rem", marginTop: "3px" }}
            />
          </Link>

          <h1 className={styles.formHeading}>Create an account</h1>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            designation: "",
          }}
          validationSchema={signupSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, handleChange, handleSubmit }) => (
            <form id="signupForm">
              <div className={styles.inputDiv}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  className={styles.input}
                  onChange={handleChange("firstName")}
                />

                {errors.firstName && touched.firstName ? (
                  <div className={styles.formErrorDiv}>{errors.firstName}</div>
                ) : null}
              </div>

              <div className={styles.inputDiv}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  className={styles.input}
                  onChange={handleChange("lastName")}
                />

                {errors.lastName && touched.lastName ? (
                  <div className={styles.formErrorDiv}>{errors.lastName}</div>
                ) : null}
              </div>

              <div className={styles.inputDiv}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="text"
                  className={styles.input}
                  onChange={handleChange("email")}
                />

                {errors.email && touched.email ? (
                  <div className={styles.formErrorDiv}>{errors.email}</div>
                ) : null}
              </div>

              <div className={styles.inputDiv}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  className={styles.input}
                  onChange={handleChange("password")}
                />

                {errors.password && touched.password ? (
                  <div className={styles.formErrorDiv}>{errors.password}</div>
                ) : null}
              </div>

              <div className={styles.inputDiv}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  className={styles.input}
                  onChange={handleChange("confirmPassword")}
                />

                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className={styles.formErrorDiv}>
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className={styles.inputDiv}>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  className={styles.input}
                  onChange={handleChange("phoneNumber")}
                  onKeyPress={() => {
                    return "/[0-9]/i.test(event.key)";
                  }}
                />

                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className={styles.formErrorDiv}>
                    {errors.phoneNumber}
                  </div>
                ) : null}
              </div>

              <div className={styles.inputDiv}>
                <Select
                  id="designation"
                  defaultValue="Select one"
                  name="designation"
                  onChange={handleChange("designation")}
                  className={styles.input}
                >
                  <MenuItem value="Select one" disabled>
                    Choose your designation
                  </MenuItem>

                  <MenuItem value="Frontend Developer">
                    Frontend Developer
                  </MenuItem>

                  <MenuItem value="Backend Developer">
                    Backend Developer
                  </MenuItem>

                  <MenuItem value="Fullstack Developer">
                    Fullstack Developer
                  </MenuItem>

                  <MenuItem value="Finance">Finance</MenuItem>

                  <MenuItem value="Human Resource">Human Resource</MenuItem>

                  <MenuItem value="Product Designer">Product Designer</MenuItem>

                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>

                {errors.designation && touched.designation ? (
                  <div className={styles.formErrorDiv}>
                    {errors.designation}
                  </div>
                ) : null}
              </div>

              <div className={styles.buttonDiv}>
                <Button
                  type="button"
                  variant="contained"
                  className={styles.signupButton}
                  onClick={handleSubmit}
                >
                  Signup
                </Button>

                <Button
                  type="submit"
                  variant="outlined"
                  className={styles.signupButton}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>

        <p className={styles.register}>
          Already have an account?{" "}
          <Link to="/login" className={styles.registerLink}>
            Log In
          </Link>
        </p>
      </Grid>
      <ToastContainer position="top-right" autoClose={3000} />
    </Grid>
  );
};

export default Signup;
