import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* comps */
import AuthInput from "./AuthInput";

const Register = ({
  register,
  onChange,
  onRegisterSubmit,
  toggleLogin,
  setToggleLogin,
  error
}) => {
  console.log("kuk", toggleLogin);
  return (
    <form
      className="message-bar-div"
      onSubmit={event => onRegisterSubmit(event)}
    >
      <AuthInput
        type={"text"}
        name={"username"}
        onChange={onChange}
        value={register.username}
        cssClass={"input-message"}
        placeholder={"username"}
      />
      <AuthInput
        type={"text"}
        name={"password"}
        onChange={onChange}
        value={register.password}
        cssClass={"input-message"}
        placeholder={"password"}
      />
      <AuthInput
        type={"text"}
        name={"password2"}
        onChange={onChange}
        value={register.password2}
        cssClass={"input-message"}
        placeholder={"password again"}
      />
      {error ? error : ""}
      <h3>PICK A COLOR - USED FOR YOUR MESSAGES</h3>
      <AuthInput
        type={"color"}
        name={"colour"}
        onLoginChange={onChange}
        value={register.colour}
        cssClass={"input-message"}
        placeholder={"colour"}
      />
      <button type="submit" className="message-button">
        Register
      </button>
      <button
        className="message-button"
        onClick={event =>
          setToggleLogin({
            toggle: !toggleLogin.toggle
          })
        }
      >
        Go Back
      </button>
    </form>
  );
};

Register.propTypes = {};

export default Register;
