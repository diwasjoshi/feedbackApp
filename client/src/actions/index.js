import axios from 'axios';
import { FETCH_USER } from '../constants/actionTypes';

export const fetchUser = () => async dispatch => {
    const result = await axios.get('/api/accounts/current_user');

    dispatch({ type: FETCH_USER, payload: result.data });
};

export const handleStripeToken = token => async dispatch => {
    const result = await axios.get('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: result.data });
};
