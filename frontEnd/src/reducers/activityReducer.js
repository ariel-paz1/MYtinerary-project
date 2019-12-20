import {
    GET_ACTIVITY,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    ACTIVITY_LOADING
  } from '../actions/types';
  
  const initialState = {
    activityData: [],
    loading: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ACTIVITY:
        return {
          ...state,
          activityData: action.payload,
          loading: false
        };
      case DELETE_ACTIVITY:
        return {
          ...state,
          activityData: state.activityData.filter(item => item._id !== action.payload)
        };
      case ADD_ACTIVITY:
        return {
          ...state,
          activityData: [action.payload, ...state.activityData]
        };
      case ACTIVITY_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }