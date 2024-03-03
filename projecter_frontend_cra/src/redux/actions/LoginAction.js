import axios from "axios";
import { toast } from "react-toastify";
import { LOG_IN, USER_DATA } from "../containers/Constant";

const loginAction = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      credentials
    );

    sessionStorage.setItem("token", response.data.token);

    const user = await axios.get("http://localhost:3000/user/getone", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });

    const userData = {
      role: user?.data?.user?.role,
    };

    sessionStorage.setItem("user", JSON.stringify(userData));

    await dispatch({ type: LOG_IN, payload: response.data }); // response.data has {status and token}.
    await dispatch({ type: USER_DATA, payload: user.data.user });
  } catch (err) {
    if (err?.response?.data?.msg === "Could not find email") {
      toast.error("Invalid email address");
    } else if (err?.response?.data?.msg === "Incorrect password") {
      toast.error("Incorrect password");
    }
  }
};

export default loginAction;
