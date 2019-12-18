import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import itineraryReducer from './itineraryReducer';

export default combineReducers({
  item: itemReducer,
  itinerary: itineraryReducer,
  error: errorReducer,
  auth: authReducer
});