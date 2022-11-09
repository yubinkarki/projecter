import axios from "axios";
import { toast } from "react-toastify";
import { CHANGE_PASSWORD } from "../containers/Constant";

const changePasswordAction = (credentials) => async (dispatch) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/user/password/update",
      credentials,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    );

    await dispatch({ type: CHANGE_PASSWORD, payload: response.data });

    if (response.data.status === true) {
      toast.success("Password changed successfully");
    }
  } catch (err) {
    if (err.response.data.passwordError === true) {
      toast.error("Incorrect current password");
    } else if (err.response.data.confirmPasswordError === true) {
      toast.error("Please confirm new password");
    }
  }
};

export default changePasswordAction;
