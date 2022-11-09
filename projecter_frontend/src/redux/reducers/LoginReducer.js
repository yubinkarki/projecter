import { LOG_IN, SIGN_UP, USER_DATA } from "../containers/Constant";

const initState = {
  loginState: {},
  signupState: {},
  userData: {},
};

export default function loginReducer(state = initState, action) {
  let { type, payload } = action;

  switch (type) {
    case LOG_IN:
      return { ...state, loginState: payload };

    case USER_DATA:
      return { ...state, userData: payload };

    case SIGN_UP:
      return { ...state, signupState: payload };

    default:
      return state;
  }
}
