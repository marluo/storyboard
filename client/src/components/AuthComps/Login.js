import React, { useState } from "react";

/* comps */
import AuthInput from "./AuthInput";

/* ACTIONS */
import { loginUser } from "../../actions/userActions";
import { STATES } from "mongoose";

const Login = ({
  login,
  onLoginChange,
  onLoginSubmit,
  toggleLogin,
  setToggleLogin
}) => {
  console.log("marcus", toggleLogin);
  return (
    <form className="message-bar-div" onSubmit={event => onLoginSubmit(event)}>
      <AuthInput
        type={"text"}
        name={"username"}
        onChange={onLoginChange}
        value={login.username}
        cssClass={"input-message"}
        placeholder={"username"}
      />
      <AuthInput
        type={"text"}
        name={"password"}
        onChange={onLoginChange}
        value={login.password}
        cssClass={"input-message"}
        placeholder={"password"}
      />
      <button type="submit" className="message-button">
        Login
      </button>
      <button
        className="message-button"
        onClick={event =>
          setToggleLogin({
            toggle: !toggleLogin.toggle
          })
        }
      >
        register
      </button>
    </form>
  );
};

Login.propTypes = {};

export default Login;
