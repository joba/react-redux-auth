import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

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

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
