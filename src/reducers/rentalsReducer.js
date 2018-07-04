import { SET_RENTALS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_RENTALS:

        return action.payload || null;

      default:
        return state;
    }
  }
