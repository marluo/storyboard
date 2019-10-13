import React, { Fragment } from "react";
import PropTypes from "prop-types";

const MessageBar = ({ onMessageChange, handleMessage, sendMessage }) => {
  return (
    <Fragment>
      <form
        className="message-bar-div"
        onSubmit={event => handleMessage(event)}
      >
        <input
          type="text"
          name="message"
          onChange={event => onMessageChange(event)}
          value={sendMessage.message}
          className="input-message"
          placeholder="Send Message"
        />
        <button type="submit" className="message-button">
          Send Message
        </button>
      </form>
    </Fragment>
  );
};

MessageBar.propTypes = {};

export default MessageBar;
