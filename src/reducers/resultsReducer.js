import { FETCH_RESULTS } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_RESULTS:

        return action.payload || null;

      default:
        return state;
    }
  }
