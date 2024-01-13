import axios from "axios";
import { toast } from "react-toastify";

const signupAction = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/user/signup",
      JSON.stringify(userData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("signup", response.data.status); // response.data has {status and msg}.
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export default signupAction;
