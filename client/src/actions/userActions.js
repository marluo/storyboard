import axios from "axios";
import setTokenHeader from "../utils/setTokenHeader";
import { register } from "../serviceWorker";

export const authUser = () => async dispatch => {
  try {
    const response = await axios.get("/api/user/auth");
    dispatch({
      type: "AUTH_USER",
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (loginInfo, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(loginInfo);

  try {
    const res = await axios.post("/api/login", body, config);
    history.push("/");
    dispatch({
      type: "LOGIN_USER",
      payload: res.data
    });
  } catch (error) {
    console.error("LOGIN ERROR LOL!");
  }
};

export const registerUser = (registerInfo, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(registerInfo);

  try {
    const res = await axios.post("/api/register", body, config);
    history.push("/");
    dispatch({
      type: "LOGIN_USER",
      payload: res.data
    });
  } catch (error) {
    console.error("LOGIN ERROR LOL!");
  }
};
