import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const RoomHeader = props => {
  return (
    <div className="roomheader-container">
      <h1>
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
      </h1>
    </div>
  );
};

RoomHeader.propTypes = {};

export default RoomHeader;
