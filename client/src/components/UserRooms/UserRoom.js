import React, { useEffect, Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  getRoom,
  sendRoomMessage,
  getInvitedRooms,
  getJoinedRooms
} from "../../actions/roomActions";
import { addMessagesRealtime } from "../../actions/roomActions";
import socketIOClient from "socket.io-client";
import MessageBar from "./MessageBar";
import _ from "lodash";

//components
import RoomHeader from "../Rooms/RoomHeader";

let socket = socketIOClient("http://localhost:5000");

const UserRoom = ({
  match: {
    params: { id }
  },
  getRoom,
  roomloading,
  roomdata,
  addMessagesRealtime,
  store,
  sendRoomMessage,
  getJoinedRooms,
  getInvitedRooms
}) => {
  useEffect(() => {
    getRoom(id);
  }, [id]);

  const [sendMessage, setSendMessage] = useState({
    message: ""
  });

  //event handler på input som skrivs vid submit
  const handleMessage = event => {
    event.preventDefault();
    sendRoomMessage(sendMessage.message, id);
  };

  //sparar det som skrivs i onChange i state
  const onMessageChange = event => {
    setSendMessage({
      ...sendMessage,
      [event.target.name]: event.target.value
    });
  };

  const dispatchSocket = useDispatch();

  socket.on("message", message =>
    dispatchSocket({ type: "NEW_MESSAGE", payload: message })
  );

  //hämtar unika använda med new Set. mappar sedan ut alla unika värden
  const uniqueUsers = () => {
    var unique = _.uniqBy(roomdata.room.messages, id => id.user.username);
    console.log(unique);
    return (
      <div className="joined-container">
        {unique.length > 0 ? (
          <h3>Joined Users</h3>
        ) : (
          <h3>Currently No Users</h3>
        )}
        <div className="joined-users">
          {unique.map(user => (
            <div
              className="message-user"
              style={{ background: `${user.user.colour}` }}
            >
              {user.user.username}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="user-room-container">
      <RoomHeader />
      {!roomloading && roomdata.room ? (
        <div>
          Message Limit per turn:{" "}
          {roomdata.room.messageSettings.limitedMessages}
          <br />
          Max Messages: {roomdata.room.messageSettings.maxMessages}
          {uniqueUsers()}
        </div>
      ) : null}
      <div className="user-room-singleroom">
        {!roomloading && roomdata.room && roomdata.room.messages.length > 0 ? (
          roomdata.room.messages.map(message => (
            <div
              className="message-user"
              style={{ background: `${message.user.colour}` }}
            >
              {message.message}
            </div>
          ))
        ) : (
          <div>
            <h3>
              There are currently no messages in this room! Be the first one to
              start this tale.
            </h3>
          </div>
        )}
      </div>
      {!roomloading &&
      roomdata.room &&
      (roomdata.room.messageSettings.maxMessages >=
        roomdata.room.messages.length ||
        roomdata.room.messages.length === 0) ? (
        <MessageBar
          handleMessage={handleMessage}
          onMessageChange={onMessageChange}
          sendMessage={sendMessage}
        />
      ) : (
        <h3>Story is finished!</h3>
      )}
    </div>
  );
};

UserRoom.propTypes = {};

const mapStateToProps = state => {
  return {
    roomloading: state.rooms.room.loading,
    roomdata: state.rooms.room.roomdata
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  {
    getRoom,
    addMessagesRealtime,
    sendRoomMessage,
    getInvitedRooms,
    getJoinedRooms
  }
)(UserRoom);
