import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { Link, Redirect, useHistory } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtnGroup
} from "mdbreact";
import PropTypes from "prop-types";
import {
  getRooms,
  getInvitedRooms,
  getJoinedRooms
} from "../../actions/roomActions";

const UserRoom2 = ({
  getRooms,
  rooms: { rooms, loading },
  getInvitedRooms,
  user,
  router
}) => {
  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <div className="text-center mx-auto p-3 mt-2 d-flex justify-content-center align-items-center flex-column">
      <MDBCard className="w-50 mb-4">
        <MDBCardBody>
          <MDBCardTitle>Joined Users</MDBCardTitle>
          <MDBBtn color="primary">go somewhere</MDBBtn>
          <MDBBtn color="primary">go somewhere</MDBBtn>
          <MDBBtn color="primary">go somewhere</MDBBtn>
          <MDBBtn color="primary">go somewhere</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="w-75 mb-4 d-flex justify-content-center">
        <MDBCardBody className="d-flex flex-column justify-content-start">
          <MDBCardTitle className="mb-4">Messages</MDBCardTitle>
          <div className="d-flex flex-row justify-content-start">
            <MDBRow>
              <MDBCol md="12" className="mb-4">
                <MDBBtnGroup size="lg">
                  <MDBBtn disabled color="unique">
                    Left
                  </MDBBtn>
                  <MDBBtn color="dark">Middle</MDBBtn>
                  <MDBBtn disabled color="dark">
                    Right
                  </MDBBtn>
                </MDBBtnGroup>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

UserRoom2.propTypes = {};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    getRooms,
    getInvitedRooms,
    getJoinedRooms
  }
)(UserRoom2);
