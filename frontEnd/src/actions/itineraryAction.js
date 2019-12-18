import axios from 'axios';
import { GET_ITINERARY, ITINERARY_LOADING, ADD_ITINERARY, DELETE_ITINERARY} from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
export const getItinerary = name => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get(`http://localhost:5000/itinerario/${name}`)
      .then(res =>
        dispatch({
          type: GET_ITINERARY,
          payload: res.data
        })
      )
      .catch(err => {
        if(err.status === 404)
          dispatch(returnErrors(err.response.data, err.response.status))
        else
          console.log("No hay datos");
      }
      );
  };

  export const addItinerary = item => (dispatch, getState) => {
    axios
      .post('http://localhost:5000/itinerario', item, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: ADD_ITINERARY,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
  
  export const deleteItinerary = id => (dispatch, getState) => {
    axios
      .delete(`http://localhost:5000/itinerario:${id}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: DELETE_ITINERARY,
          payload: id
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  export const setItemsLoading = () => {
    return {
      type: ITINERARY_LOADING
    };
  };
  
  
  