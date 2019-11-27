import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


// Nuevo codigo valentinog
/*
export function getItems() {
  return function(dispatch) {
    return fetch("http://localhost:5000/city")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_ITEMS, payload: json });
      });
  };
}

/*
import { ADD_ARTICLE } from "../actions/types";
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
*/

// Codigo de pagina inet

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('http://localhost:5000/city')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
    
};

export const getItinerary = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('http://localhost:5000/itinerario')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('http://localhost:5000/city', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:5000/city:${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};



