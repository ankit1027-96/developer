import { createReducer } from "@reduxjs/toolkit";
import {
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  PROFILE_LOADING,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(PROFILE_LOADING, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })

    .addCase(GET_PROFILE, (state, action) => {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    })
    .addCase(CLEAR_CURRENT_PROFILE, (state, action) => {
      return {
        ...state,
        profile: null,
      };
    })
    .addDefaultCase((state) => {
      return state;
    });
});
