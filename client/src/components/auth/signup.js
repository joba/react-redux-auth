import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up user.
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oh no!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <label>Email</label>
        <input {...email} className="form-control" />
        {email.touched && email.error && <div className="error">{email.error}</div>}
      </fieldset>
      <fieldset className="form-group">
        <label>Password</label>
        <input type="password" {...password} className="form-control" />
        {password.touched && password.error && <div className="error">{password.error}</div>}
      </fieldset>
      <fieldset className="form-group">
        <label>Confirm Password</label>
        <input type="password" {...passwordConfirm} className="form-control" />
        {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

// reduxForm calls validate with all input fields
function validate(formProps) {
  const errors = {};

  if(!formProps.email) {
    errors.email = 'Email is required';
  }

  if(!formProps.password) {
    errors.password = 'Password is required';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password confirmation is required';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
