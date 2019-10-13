import axios from "axios";

export const getRooms = () => async dispatch => {
  try {
    const response = await axios.get("/api/rooms/");
    dispatch({
      type: "GET_ROOMS",
      payload: response.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRoom = room => async dispatch => {
  try {
    const response = await axios.get(`/api/getroom/${room}`);
    console.log(response);
    dispatch({
      type: "GET_ROOM",
      payload: response.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const addMessagesRealtime = message => async dispatch => {
  try {
    dispatch({
      type: "ROOMLOL",
      payload: message
    });
  } catch (err) {
    console.error(err);
  }
};

export const sendRoomMessage = (message, id) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ message });

  const res = await axios.put(`/api/messageroom/${id}/`, body, config);
  console.log(res);
};

export const createRoom = (room, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(room);

    const res = await axios.post("/api/createroom/", body, config);

    history.push(`/room/5d9f7cfd`);

    dispatch({
      type: "room",
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const getInvitedRooms = () => async dispatch => {
  try {
    const response = await axios.get("/api/rooms/invited");

    dispatch({
      type: "GET_INVITED_ROOMS",
      payload: response.data
    });
  } catch (error) {
    console.error("THERE WAS AN ERROR!");
  }
};

export const getJoinedRooms = () => async dispatch => {
  try {
    const response = await axios.get("/api/rooms/joined");
  } catch (error) {}
};
