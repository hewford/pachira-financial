import { SET_RENTALS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_RENTALS:

        // set state to be recalled when Rentals Component mounts.
        return action.payload || null;

      default:
        return state;
    }
  }
