import setTokenHeader from "../utils/setTokenHeader";

const initialState = {
  user: null,
  isAuthed: false,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER": {
      localStorage.setItem("token", payload.token);
      setTokenHeader(payload.token);
      return {
        //sätter token i localstorage
        ...state,
        user: payload,
        isAuthed: true,
        loading: false
      };
    }
    case "AUTH_USER": {
      return {
        ...state,
        user: payload,
        isAuthed: true,
        loading: false
      };
    }
    case "ERROR_USER": {
      return {
        ...state,
        error: payload
      };
    }
    case "LOGOUT_USER": {
      localStorage.removeItem("token");
      return {
        user: null,
        isAuthed: false,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
};
