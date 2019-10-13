import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import RoomHeader from "../Rooms/RoomHeader";

/* ACTIONS */
import { loginUser, registerUser } from "../../actions/userActions";

/* COMPONENTS */
import Login from "./Login";
import Register from "./Register";

const AuthContainer = ({ error, loginUser, history, registerUser }) => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [register, setRegister] = useState({
    username: "",
    password: "",
    password2: "",
    colour: ""
  });

  const [toggleLogin, setToggleLogin] = useState({
    toggle: true
  });

  const dispatchNotMaching = useDispatch();

  const onLoginChange = event =>
    setLogin({ ...login, [event.target.name]: event.target.value });

  const onRegisterChange = event =>
    setRegister({ ...register, [event.target.name]: event.target.value });

  const onRegisterSubmit = event => {
    event.preventDefault();
    if (register.password === register.password2) {
      registerUser(register, history);
    } else {
      dispatchNotMaching({
        type: "ERROR_USER",
        payload: "passwords are not matching"
      });
    }
  };

  console.log(register);

  const onLoginSubmit = event => {
    event.preventDefault();
    loginUser(login, history);
  };

  console.log(login);

  return (
    <div className="room-container">
      <RoomHeader />
      {toggleLogin.toggle ? (
        <Login
          login={login}
          onLoginChange={onLoginChange}
          onLoginSubmit={onLoginSubmit}
          setLogin={setLogin}
          toggleLogin={toggleLogin}
          setToggleLogin={setToggleLogin}
        />
      ) : (
        <Register
          error={error}
          register={register}
          onRegisterSubmit={onRegisterSubmit}
          onChange={onRegisterChange}
          setLogin={setLogin}
          toggleLogin={toggleLogin}
          setToggleLogin={setToggleLogin}
        />
      )}
    </div>
  );
};

AuthContainer.propTypes = {};

const mapStateToProps = state => {
  return {
    error: state.user.error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser, registerUser }
  )(AuthContainer)
);
