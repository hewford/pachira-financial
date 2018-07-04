import { combineReducers } from 'redux';
import assumptionsReducer from './assumptionsReducer';
import growthAssumptionsReducer from './growthAssumptionsReducer';
import calculationsReducer from './calculationsReducer';
import currentStatusReducer from './currentStatusReducer';
import pensionsReducer from './pensionsReducer';
import rentalsReducer from './rentalsReducer';
import resultsReducer from './resultsReducer';

export default combineReducers({
    assumptions: assumptionsReducer,
    growthAssumptions: growthAssumptionsReducer,
    currentStatus: currentStatusReducer,
    pensions: pensionsReducer,
    rentals: rentalsReducer,
    calculations: calculationsReducer,
    results: resultsReducer
});
