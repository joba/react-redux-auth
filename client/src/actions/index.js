import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
      // submit to backend
      axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
          // If request is ok
          // - update state to say user is authenticated
          // redux thunk dispatch action of type AUTH_USER
          dispatch({ type: AUTH_USER });
          // - save jwt token
          localStorage.setItem('token', response.data.token);
          // - redirect
          browserHistory.push('/feature');
        })
        .catch(() => {
          //  If request not ok
          // - Show error
          dispatch(authError('Bad login info'));
        })
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function signupUser({email, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => {
        dispatch(authError(response.data.error));
      })
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
