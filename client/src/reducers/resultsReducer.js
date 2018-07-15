import { FETCH_RESULTS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_RESULTS:
        // set results state from data served.
        console.log(window.performance.now(), 'calculations pulled from API')
        return action.payload.data || null;

      default:
        return state;
    }
  }
