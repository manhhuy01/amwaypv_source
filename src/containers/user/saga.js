import {
  put, takeLatest,
  call
} from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './constants'

import { login } from '../../services/request.js'



function* loginSaga(action){
  try{
    yield call(login, action.user)
    yield put({type: LOGIN_SUCCESS, user: action.user})
  }
  catch(err) {
    yield put({type: LOGIN_FAIL, user: action.user})
  }
}

function* root() {
  yield takeLatest(LOGIN, loginSaga);
}

export default root;