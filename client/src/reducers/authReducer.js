import { createReducer } from "@reduxjs/toolkit";
import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SET_CURRENT_USER, (state, action) => {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    })
    .addDefaultCase((state) => {
      return state;
    });
});
