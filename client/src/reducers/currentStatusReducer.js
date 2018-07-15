import { SET_CURRENT_STATUS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_STATUS:

        // set state to be recalled when CurrentStatus Component mounts.
        return action.payload || null;

      default:
        return state;
    }
  }
