import React from "react";
import PropTypes from "prop-types";

const AuthInput = ({
  onChange,
  type,
  name,
  value,
  cssClass,
  placeholder,
  width
}) => (
  <input
    type={type}
    name={name}
    onChange={event => onChange(event)}
    value={value}
    className={cssClass}
    placeholder={placeholder}
    style={{ width: width }}
  />
);

AuthInput.propTypes = {};

export default AuthInput;
