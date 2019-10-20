import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBBtn
} from "mdbreact";
import PropTypes from "prop-types";
import {
  getRooms,
  getInvitedRooms,
  getJoinedRooms
} from "../../actions/roomActions";

const Rooms = ({
  getRooms,
  rooms: { rooms, loading },
  getInvitedRooms,
  user,
  router
}) => {
  useEffect(() => {
    getRooms();
  }, [getRooms]);

  let history = useHistory();

  const chooseRoom = () => {
    if (activeRoom.current === 1) {
      return rooms.room;
    }
    if (activeRoom.current === 2) {
      return rooms.joinedrooms;
    }
    if (activeRoom.current === 3) {
      return rooms.invitedrooms;
    }
    if (activeRoom.current === 4) {
      return rooms.yourrooms;
    }
  };

  const [activeRoom, setActiveRoom] = useState({
    current: 1
  });

  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState({
    buttonClass: "all-rooms"
  });

  const onTableClick = room => {
    console.log("ee", room);
    history.push(`room/${room.roomname}`);
  };

  return (
    <div className="w-responsive text-center mx-auto p-3 mt-2">
      <div className="mt-3 mb-5 d-flex justify-content-around">
        <MDBBtn
          color="indigo"
          className={activeButton.buttonClass === "all-rooms" ? "active" : ""}
          onClick={() => {
            setActiveButton({
              buttonClass: "all-rooms"
            });
            setActiveRoom({
              current: 1
            });
          }}
        >
          All Rooms
        </MDBBtn>
        <MDBBtn
          color="indigo"
          className={
            activeButton.buttonClass === "joined-rooms" ? "active" : ""
          }
          onClick={() => {
            setActiveButton({
              buttonClass: "joined-rooms"
            });
            setActiveRoom({
              current: 2
            });
            dispatch({
              type: "JOINED_ROOMS",
              payload: user.user
            });
          }}
        >
          >Joined Rooms
        </MDBBtn>
        <MDBBtn
          color="indigo"
          className={
            activeButton.buttonClass === "invited-rooms" ? "active" : ""
          }
          onClick={() => {
            setActiveButton({
              buttonClass: "invited-rooms"
            });
            setActiveRoom({
              current: 3
            });
            dispatch({
              type: "INVITED_ROOMS",
              payload: user.user
            });
          }}
        >
          Invited Rooms
        </MDBBtn>
        <MDBBtn
          color="indigo"
          className={activeButton.buttonClass === "your-rooms" ? "active" : ""}
          onClick={() => {
            setActiveButton({
              buttonClass: "your-rooms"
            });
            setActiveRoom({
              current: 4
            });
            dispatch({
              type: "YOUR_ROOMS",
              payload: user.user
            });
          }}
        >
          >Your Rooms
        </MDBBtn>
      </div>
      <MDBTable hover fixed>
        <MDBTableHead color="dark">
          <tr>
            <th>Roomname</th>
            <th>Messages</th>
            <th>Players</th>
            <th>Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody color="brown lighten-4">
          {!loading && rooms ? (
            chooseRoom().map(room => (
              <tr onClick={() => onTableClick(room)}>
                <td>{room.ownroomname}</td>
                <td>{room.messages.length}</td>
                <td>3</td>
                <td>
                  {room.messages.length === room.messageSettings.maxMessages
                    ? "Finished"
                    : "Ongoing"}
                </td>
              </tr>
            ))
          ) : (
            <div>asdasdasd</div>
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

Rooms.propTypes = {};

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
)(Rooms);
