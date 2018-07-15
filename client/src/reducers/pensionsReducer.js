import { SET_PENSIONS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_PENSIONS:

        // set state to be recalled when Pensions Component mounts.
        return action.payload || null;

      default:
        return state;
    }
  }
