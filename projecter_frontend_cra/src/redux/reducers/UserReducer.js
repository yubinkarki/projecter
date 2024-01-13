import { CHANGE_PASSWORD } from "../containers/Constant";

const initState = {
  changePassword: {},
};

export default function userReducer(state = initState, action) {
  let { type, payload } = action;

  switch (type) {
    case CHANGE_PASSWORD:
      return { ...state, changePassword: payload };

    default:
      return state;
  }
}
