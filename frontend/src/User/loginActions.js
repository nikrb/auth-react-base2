import fetch from 'cross-fetch';
import * as UserTypes from './UserTypes';

function requestLoginSuccess(user) {
  return {
    type: UserTypes.REQUEST_LOGIN_SUCCESS,
    user,
    message: "Login Successful"
  };
}
function requestLoginFailed(error) {
  return {
    type: UserTypes.REQUEST_LOGIN_FAILED,
    error: error.error
  };
}
export function clearLoginError() {
  return {
    type: UserTypes.CLEAR_LOGIN_ERROR,
    error: false
  };
}
export function requestLogin(payload) {
  return function(dispatch) {
    dispatch( clearLoginError());
    return fetch('/api/v1/login', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify( payload)
    })
    .then( res => res.json())
    .then( json => {
      if (json.error) {
        dispatch(requestLoginFailed(json));
      } else {
        dispatch(requestLoginSuccess(json));
      }
    })
    .catch( err => dispatch(requestLoginFailed(err)));
  }
}

function autoLoginSuccess( user) {
  return {
    type: UserTypes.AUTO_LOGIN_SUCCESS,
    user
  }
}
function autoLoginFailed(error) {
  return {
    type: UserTypes.AUTO_LOGIN_FAILED,
    error
  }
}
export function autoLogin() {
  return function(dispatch) {
    return fetch('/api/v1/user',{
      credentials: 'same-origin'
    })
    .then( res => {
      if( res.ok) return res.json();
      return {};
    })
    .then( json => dispatch(autoLoginSuccess(json)))
    .catch( err => dispatch(autoLoginFailed(err)));
  };
}

function requestLogout() {
  return {
    type: UserTypes.LOGOUT
  }
}
export function logout() {
  return function(dispatch) {
    dispatch( requestLogout());
    return fetch('/api/v1/logout');
  };
}

function requestRegisterSuccess(user) {
  return {
    type: UserTypes.USER_REGISTER_SUCCESS,
    user,
    message: "Registration Successful"
  };
}
function requestRegisterFailed(error) {
  return {
    type: UserTypes.USER_REGISTER_FAILED,
    error
  };
}

export function requestRegister(payload) {
  return function( dispatch) {
    return fetch('/api/v1/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify( payload)
    })
    .then( res => res.json())
    .then( json => {
      if (json.errors) {
        dispatch( requestRegisterFailed(json.errors[0]));
      } else {
        dispatch( requestRegisterSuccess(json));
      }
    })
    .catch( err => dispatch( requestRegisterFailed(err)));
  };
}
