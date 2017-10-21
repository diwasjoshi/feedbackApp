import axios from 'axios';
import { FETCH_USER } from '../constants/actionTypes';

export const fetchUser = () => async dispatch => {
    const result = await axios.get('/api/accounts/current_user');
    console.log(result);
    dispatch({ type: FETCH_USER, payload: result.data });
};
