import { createReducer } from "@reduxjs/toolkit";
import { GET_ERRORS } from "../actions/types";
const initialState = {};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(GET_ERRORS, (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});
