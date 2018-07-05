import { SET_CURRENT_STATUS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_STATUS:

        return action.payload || null;

      default:
        return state;
    }
  }
