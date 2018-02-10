import * as UserTypes from '../User/UserTypes';

export function isWorking(isWorking = false) {
  return {
    type: UserTypes.USER_IS_WORKING,
    isWorking
  };
}
export function userErrored(error = "Unknown Error") {
  return {
    type: UserTypes.USER_ERRORED,
    error
  };
}
export function userGetSuccess(user={}) {
  return {
    type: UserTypes.USER_GET_SUCCESS,
    user
  };
}
export function userSaveSuccess(user={}) {
  return {
    type: UserTypes.USER_SAVE_SUCCESS,
    user,
    message: "Saved Successfully",
    saved: true
  }
}

export function clearStatus() {
  return {
    type: UserTypes.CLEAR_STATUS
  };
}
export function getDetail(user_id) {
  return function(dispatch) {
    dispatch( isWorking(true));
    dispatch( userErrored(false));
    let uri = `/api/v1/user`;
    if( user_id) {
      uri += `/${user_id}`;
    }
    return fetch( uri, {
      credentials: 'same-origin'
    })
    .then( response => {
      dispatch( isWorking( false));
      return response.json();
    })
    .then(
      json => dispatch( userGetSuccess(json)),
      err => dispatch( userErrored(err.message))
    );
  };
}

export function profileSave( user) {
  return function(dispatch) {
    dispatch( isWorking( true));
    dispatch( userErrored(false));
    const payload = new FormData();
    payload.append( 'name', user.name);
    payload.append( 'email', user.email);
    if (user.avatar) {
      if ( typeof user.avatar === 'string') {
        payload.append( 'avatar', user.avatar);
      } else {
        payload.append( 'blobs', user.avatar);
      }
    }
    return fetch( '/api/v1/user', {
      method: 'post',
      credentials: 'same-origin',
      body: payload
    })
    .then( response => {
      dispatch( isWorking(false));
      return response.json();
    })
    .then( json => {
      if( json.success) {
        dispatch( userSaveSuccess(json.user));
      } else {
        dispatch( userErrored(json.message));
      }
    })
    .catch( err => dispatch(userErrored(err.message)));
  };
}
