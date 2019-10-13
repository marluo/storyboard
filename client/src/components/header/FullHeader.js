import React, { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../actions/userActions";
import PropTypes from "prop-types";

const FullHeader = ({ user }) => {
  let history = useHistory();
  const dispatch = useDispatch({});

  console.log(user.user ? user.user.username : "www");
  return (
    <div className="header-container">
      <div className="header-bar">
        <div className="header-logo">
          <h3>
            <span>S</span>
            <span>t</span>
            <span>o</span>
            <span>r</span>
            <span>y</span>
            <span>b</span>
            <span>o</span>
            <span>a</span>
            <span>r</span>
            <span>d</span>
          </h3>
        </div>
        <div className="header-user-container">
          {!user.isLoading && user.isAuthed ? (
            <Fragment>
              <div className="user-login">{user.user.username}</div>
              <div className="user-login">
                <button
                  className="logout-button"
                  onClick={() => {
                    history.push("/login");
                    dispatch({ type: "LOGOUT_USER" });
                  }}
                >
                  <p>Logout</p>
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div>Loading...</div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(FullHeader);
