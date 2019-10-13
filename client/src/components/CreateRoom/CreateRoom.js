import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

/* components */
import RoomHeader from "../../components/Rooms/RoomHeader";
import AuthInput from "../../components/AuthComps/AuthInput";

/* actions */
import { createRoom } from "../../actions/roomActions";

const CreateRoom = ({ createRoom, history }) => {
  const [room, setRoom] = useState({
    ownroomname: "",
    limitedMessages: "",
    maxMessages: "",
    privacy: false
  });

  console.log(room);

  const onChange = event =>
    setRoom({ ...room, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    createRoom(room, history);
  };
  return (
    <div className="room-container">
      <RoomHeader />
      <form onSubmit={event => onSubmit(event)} className="row">
        Room Name
        <AuthInput
          cssClass={"input-message"}
          cssClass={"input-message"}
          name={"ownroomname"}
          value={room.ownroomname}
          onChange={onChange}
        />
        Message Limits per User
        <AuthInput
          cssClass={"input-message"}
          width={"10%"}
          type={"number"}
          name={"limitedMessages"}
          value={room.limitedMessages}
          onChange={onChange}
        />
        Max Words per Room
        <AuthInput
          cssClass={"input-message"}
          width={"10%"}
          type={"number"}
          name={"maxMessages"}
          value={room.maxMessages}
          onChange={onChange}
        />
        Private Room
        <input type="checkbox" onChange={event => onChange(event)}></input>
        <button type="submit" className="message-button">
          Create Room
        </button>
      </form>
    </div>
  );
};

CreateRoom.propTypes = {};

export default withRouter(
  connect(
    null,
    {
      createRoom
    }
  )(CreateRoom)
);
