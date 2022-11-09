import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import profileimg from "../../assets/images/users/user3.png";
import defaultprofileimg from "../../assets/images/profile4.svg";
import Button from "@mui/material/Button";
import styles from "../../assets/styles/component_styles/ProfileForm.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { USER_DATA } from "../../redux/containers/Constant";
import { useDispatch } from "react-redux";

const ProfileForm = (props) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("profileimg");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await axios.get("http://localhost:3000/user/getone", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        setFormData((prevState) => ({
          ...prevState,
          firstName: userData.data.user.firstName,
          lastName: userData.data.user.lastName,
          email: userData.data.user.email,
          phoneNumber: userData.data.user.phoneNumber,
          designation: userData.data.user.designation,
        }));
      } catch (err) {}
    };

    getUser();
  }, []);

  const removeProfileImage = () => {
    setProfileImage("defaultprofileimg");
  };

  function formSubmitHandler(e) {
    e.preventDefault();

    const submitData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    };

    async function updateUser() {
      try {
        const response = await axios.put(
          "http://localhost:3000/user/update",
          submitData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.status === true) {
          toast.success("User updated successfully");

          dispatch({ type: USER_DATA, payload: submitData });
        }
      } catch (err) {
        if (err.response.data.noUser === true) {
          toast.error("User not found");
        } else if (err.response.data.status === false) {
          toast.error("Error updating user");
        }
      }
    }

    updateUser();
  }

  return (
    <div className={styles.mainDiv}>
      <Card variant="standard" className={styles.mainCard}>
        <div className={styles.topSection}>
          {profileImage === "profileimg" ? (
            <img src={profileimg} alt="user" className={styles.img} />
          ) : profileImage === "defaultprofileimg" ? (
            <img src={defaultprofileimg} alt="user" className={styles.img} />
          ) : null}

          <div className={styles.topSectionButtonDiv}>
            <button className={styles.button}>Change</button>
            <button className={styles.button} onClick={removeProfileImage}>
              Remove
            </button>
          </div>
        </div>
        <Grid item>
          <form className={styles.profileForm}>
            <div className={styles.leftForm}>
              <div className={styles.inputDiv}>
                <label htmlFor="firstname">First Name</label>
                <br />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  required
                  className={styles.input}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className={styles.input}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="designation">Designation</label>
                <br />
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  disabled
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.rightForm}>
              <div className={styles.inputDiv}>
                <label htmlFor="lastName">Last Name</label>
                <br />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  required
                  className={styles.input}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="password">Password</label>
                <Link
                  to={`/${props.role}/profile/changepassword`}
                  className={styles.changePasswordLink}
                >
                  Change
                </Link>
                <br />
                <input
                  type="password"
                  name="password"
                  value={"defaultpassword"}
                  disabled
                  className={styles.input}
                />
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <br />
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  required
                  maxLength="14"
                  pattern="[1-9]{1}[0-9]{9}"
                  className={styles.input}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      phoneNumber: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </form>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          className={styles.saveButton}
          onClick={formSubmitHandler}
        >
          Save
        </Button>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfileForm;
