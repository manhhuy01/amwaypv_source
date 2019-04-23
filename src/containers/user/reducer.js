import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './constants'

import { validatedUser } from '../../services/commonFuncs'

let USER_INITIATION = {}
let USER_AUTHENTICATION = false
if (typeof localStorage !== 'undefined') {
  USER_INITIATION = JSON.parse(localStorage.getItem('user'))
  USER_AUTHENTICATION = localStorage.getItem('authentication') || 0
  if(USER_AUTHENTICATION){
    if(!USER_INITIATION) USER_AUTHENTICATION = false;
    const {ada, pass} = USER_INITIATION
    if(!validatedUser(ada,pass)) USER_AUTHENTICATION = false;
  }
}

const initialState = {
  user: USER_INITIATION,
  authentication: USER_AUTHENTICATION,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.user))
      localStorage.setItem('authentication', 1)
      return { ...state, user: action.user, authentication: true, loading: false }
    case LOGIN:
      return { ...state, loading: true }
    case LOGIN_FAIL:
      return { ...state, loading: false, user: undefined, authentication: false }
    case LOGOUT:
      delete localStorage.user
      delete localStorage.authentication
      return {...state, authentication: 0, user: {}}
    default:
      return state;
  }
};