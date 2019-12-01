import axios from 'axios';
import { GET_ITEMS, ITEMS_LOADING, DELETE_ITEM, ADD_ITEM } from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('http://localhost:5000/city')
    .then(res =>{
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    }
      
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



