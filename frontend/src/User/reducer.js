import * as UserTypes from './UserTypes';

export default function user(state = {
  user: {},
  isWorking: false,
  error: false,
  message: false,
  saved: false
}, action) {
  switch (action.type) {
    case UserTypes.USER_REGISTER_SUCCESS:
      // clear user so we have to login after registration
      return {...state,
        user: {},
        message: action.message
      };
    case UserTypes.USER_REGISTER_FAILED:
      return {...state,
        user: {},
        error: action.error
      };
    case UserTypes.AUTO_LOGIN_SUCCESS:
    case UserTypes.REQUEST_LOGIN_SUCCESS:
      return {...state,
        user: action.user,
        message: action.message
      };
    case UserTypes.AUTO_LOGIN_FAILED:
    case UserTypes.REQUEST_LOGIN_FAILED:
      return {...state,
        error: action.error
      };
    case UserTypes.USER_IS_WORKING:
      return {...state,
        isWorking: action.isWorking
      };
    case UserTypes.USER_GET_SUCCESS:
      return {...state,
        user: action.user
      };
    case UserTypes.USER_SAVE_SUCCESS:
      return {...state,
        user: action.user,
        message: action.message,
        saved: action.saved
      };
    case UserTypes.USER_ERRORED:
      return {...state,
        error: action.userErrored
      };
    case UserTypes.CLEAR_STATUS:
      return {...state,
        error: false,
        message: false,
        saved: false
      };
    case UserTypes.CLEAR_LOGIN_ERROR:
    case UserTypes.LOGOUT:
      return {...state,
        user: {},
        error: false,
        message: false,
        saved: false
      };
    default:
      return state;
  }
}
