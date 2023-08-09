import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // if token is there set in auth Header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
