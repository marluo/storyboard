import React, { Fragment, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import rootReducer from "./reducers";
import CreateRoom from "./components/CreateRoom/CreateRoom";

import { authUser } from "./actions/userActions";

/* UTILS */
import setTokenHeader from "./utils/setTokenHeader";
/* COMPONENTS */
import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms/Rooms";
import UserRoom from "./components/UserRooms/UserRoom";
import AuthContainer from "./components/AuthComps/AuthContainer";
import FullHeader from "./components/header/FullHeader";
import UserRoom2 from "./components/UserRooms/UserRoom2";

if (localStorage.token) {
  setTokenHeader(localStorage.token);
}

const initialState = {};
const middleware = [reduxThunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

function App() {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(authUser());
    }
  }, [authUser()]);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FullHeader />
        <Switch>
          <Route exact path="/logintest" component={UserRoom2}></Route>
          <Route exact path="/login" component={AuthContainer} />
          <Route exact path="/" component={Rooms} />
          <Route exact path="/createroom" component={CreateRoom} />
          <Route exact path="/room/:id" component={UserRoom} store={store} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
