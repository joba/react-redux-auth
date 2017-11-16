import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
      // submit to backend
      axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
          // If request is ok
          // - update state to say user is authenticated
          // - save jwt token
          // - redirect
          browserHistory.push('/feature');
        })
        .catch(() => {
          //  If request not ok
          // - Show error
        })
  }

}
