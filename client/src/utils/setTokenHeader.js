import axios from "axios";

export default token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.defaults.headers.common["Authorization"];
  }
};
