import { combineReducers } from 'redux';
import consReducer from './consReducer';
import prosReducer from './prosReducer';

const rootReducer = combineReducers({
    pros: prosReducer,
    cons: consReducer
});

export default rootReducer;