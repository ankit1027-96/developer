import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import authReducer from "./reducers/authReducer";
const middlewar = [thunk];

const initialState = {};
// createStore
// auto added thunk middleware
const store = configureStore({
  reducer: { rootReducer }, //add root reducer here
  preloadedState: initialState,
  middleware: [...middlewar], //adding middlewares
});

export default store;
