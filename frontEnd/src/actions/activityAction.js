import axios from 'axios';
import { GET_ACTIVITY, ACTIVITY_LOADING} from './types';
import { returnErrors } from './errorActions';

export const getACTIVITY = () => dispatch => {
    dispatch(setItemsLoading());
    axios
      .get('http://localhost:5000/actividades')
      .then(res =>
        dispatch({
          type: GET_ACTIVITY,
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

  export const setItemsLoading = () => {
    return {
      type: ACTIVITY_LOADING
    };
  };
  
  
  