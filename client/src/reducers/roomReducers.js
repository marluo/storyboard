import { addMessagesRealtime } from "../actions/roomActions";

const initialState = {
  loading: true,
  error: null,
  rooms: {
    room: null,
    joinedrooms: null,
    invitedrooms: null,
    myrooms: null
  },
  room: {
    loading: true,
    roomdata: null
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ROOMS": {
      console.log("ee", payload);
      return {
        ...state,
        loading: false,
        rooms: {
          room: payload
        }
      };
    }
    case "POST_ROOM":
    case "GET_ROOM": {
      return {
        ...state,
        room: {
          ...state.room,
          loading: false,
          roomdata: payload
        }
      };
    }
    case "NEW_MESSAGE": {
      return {
        ...state,
        room: {
          ...state.room,
          loading: false,
          roomdata: {
            ...state.room.roomdata,
            room: payload
          }
        }
      };
    }
    case "JOINED_ROOMS": {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          joinedrooms: state.rooms.room.filter(array => {
            return array.messages.some(messages => {
              return messages.user === payload._id;
            });
          })
        }
      };
    }
    case "INVITED_ROOMS": {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          invitedrooms: state.rooms.room.filter(array =>
            array.invitedUsers.some(invited => invited.user === payload._id)
          )
        }
      };
    }
    case "YOUR_ROOMS": {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          yourrooms: state.rooms.room.filter(array => {
            return array.admin === payload._id;
          })
        }
      };
    }
    default: {
      return state;
    }
  }
};
