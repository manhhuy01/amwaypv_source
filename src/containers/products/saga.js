import {
  put, takeLatest,
  // call
} from 'redux-saga/effects';
import { TOGGLE_DARKMODE, TOGGLE_DARKMODE_SUCCESS } from './constants'
// import { getTotalProducts} from '../../tool/productService'

function* toggleSaga(action) {
  // yield call(getTotalProducts)
  yield put({ type: TOGGLE_DARKMODE_SUCCESS, isDarkMode: action.isDarkMode })
}

function* root() {
  yield takeLatest(TOGGLE_DARKMODE, toggleSaga);
}

export default root;