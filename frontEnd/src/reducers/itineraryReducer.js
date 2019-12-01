import {
    GET_ITINERARY,
    ADD_ITINERARY,
    DELETE_ITINERARY,
    ITINERARY_LOADING
  } from '../actions/types';
  
  const initialState = {
    itinerarioData: [],
    loading: false
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ITINERARY:
        return {
          ...state,
          itinerarioData: action.payload,
          loading: false
        };
      case DELETE_ITINERARY:
        return {
          ...state,
          itinerarioData: state.itinerarioData.filter(item => item._id !== action.payload)
        };
      case ADD_ITINERARY:
        return {
          ...state,
          itinerarioData: [action.payload, ...state.itinerarioData]
        };
      case ITINERARY_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  