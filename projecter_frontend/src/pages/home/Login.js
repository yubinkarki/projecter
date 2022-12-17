import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button } from "@mui/material";
import LoginForgotPassword from "../../components/LoginForgotPassword";
import loginAction from "../../redux/actions/LoginAction";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../assets/styles/page_styles/Login_Page.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[a-z._-]{1,12}\.com$/,
        "Email pattern is not correct"
      ),
    password: Yup.string().required("Password is required"),
    // min(8, "Min 8 characters").matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
  });

  const handleFormSubmit = (values) => {
    try {
      const credentials = { email: values.email, password: values.password };

      dispatch(loginAction(credentials));

      setTimeout(() => {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));
        const role = user?.role;

        if (token) {
          navigate(`/${role}/dashboard`);

          setTimeout(() => {
            toast.success("Logged in successfully");
          }, 500);
        }
      }, 600);
    } catch (err) {
      console.log("Not able to login in", err);
    }
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
        className={styles.loginForm}
      >
        <h1 className={styles.formHeading}>Login to continue</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, handleChange, handleSubmit }) => (
            <form>
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

              <div className={styles.forgotPasswordDiv}>
                <LoginForgotPassword />
              </div>

              <Button
                type="button"
                variant="contained"
                className={styles.loginButton}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>

        <p className={styles.register}>
          Don't have an account yet?{" "}
          <Link to="/signup" className={styles.registerLink}>
            Sign Up
          </Link>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </Grid>
    </Grid>
  );
};

export default Login;
