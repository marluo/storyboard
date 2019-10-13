import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import RoomHeader from "./RoomHeader";
import {
  getRooms,
  getInvitedRooms,
  getJoinedRooms
} from "../../actions/roomActions";

const Rooms = ({
  getRooms,
  rooms: { rooms, loading },
  getInvitedRooms,
  user
}) => {
  useEffect(() => {
    getRooms();
  }, [getRooms]);

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

  console.log("marcus", activeRoom);

  const [activeButton, setActiveButton] = useState({
    buttonClass: ""
  });

  console.log(activeRoom.current, rooms);

  return (
    <div className="room-container">
      <RoomHeader />
      <Link to="/createroom">
        <button className="message-button">Create Room</button>
      </Link>
      <div className="full-room-container">
        <div className="room-title">
          <div className="rooms-different-headers">
            <div
              className="rooms-different-headers__titles rooms-different-headers__titles__active"
              onClick={() => {
                setActiveButton({
                  buttonClass: "joined-button-active"
                });
                setActiveRoom({
                  current: 1
                });
              }}
            >
              <p>All Rooms</p>
            </div>
            <div
              className="rooms-different-headers__titles"
              onClick={() => {
                setActiveButton({
                  buttonClass: "joined-button-active"
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
              <p>Joined Rooms</p>
            </div>
            <div
              className="rooms-different-headers__titles"
              onClick={() => {
                setActiveButton({
                  buttonClass: "joined-button-active"
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
              <p>Invited Rooms</p>
            </div>
            <div
              className="rooms-different-headers__titles"
              onClick={() => {
                setActiveButton({
                  buttonClass: "joined-button-active"
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
              <p>Your Rooms</p>
            </div>
          </div>
          <div className="room-list-titles-header">
            <div className="room-list-part">
              <h3>Roomname</h3>
            </div>

            <div className="room-list-part">
              <h3>Inputs</h3>
            </div>
            <div className="room-list-part">
              <h3>Number of Players</h3>
            </div>
            <div className="room-list-part">
              <h3>Status</h3>
            </div>
          </div>

          {!loading && rooms ? (
            chooseRoom().map(room => (
              <div className="room-list-titles">
                <Link to={`/room/${room.roomname}`}>
                  <div className="room-list-part">
                    <p>{room.ownroomname}</p>
                  </div>
                  {room.messages ? (
                    <div className="room-list-part">
                      <p>{room.messages.length}</p>
                    </div>
                  ) : (
                    <Fragment>asdasd</Fragment>
                  )}
                  <div className="room-list-part">
                    <p>23</p>
                  </div>
                  <div className="room-list-part">
                    <p>
                      {/* om det är samma längd på room messages som maxsettings är rummet färdigt */}
                      {room.messages.length === room.messageSettings.maxMessages
                        ? "Finished"
                        : "Ongoing"}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
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
