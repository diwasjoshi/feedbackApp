import axios from 'axios';
import { FETCH_USER } from '../constants/actionTypes';

export const fetchUser = () => async dispatch => {
    const result = await axios.get('/api/accounts/current_user');

    dispatch({ type: FETCH_USER, payload: result.data });
};

export const handleStripeToken = token => async dispatch => {
    const result = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: result.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
