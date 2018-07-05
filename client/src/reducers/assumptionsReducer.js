import { SET_ASSUMPTIONS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_ASSUMPTIONS:

        return action.payload || null;

      default:
        return state;
    }
  }
