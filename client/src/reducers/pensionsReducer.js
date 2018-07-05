import { SET_PENSIONS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_PENSIONS:

        return action.payload || null;

      default:
        return state;
    }
  }
