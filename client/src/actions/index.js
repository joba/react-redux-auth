import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
      // submit to backend
      axios.post(`${ROOT_URL}/signin`, { email, password });
      // If request is ok
      // - update state to say user is authenticated
      // - save jwt token
      // - redirect


      //  If request not ok
      // - Show error
  }

}
