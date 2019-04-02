import {
  put, takeLatest,
  call
} from 'redux-saga/effects';
import {
  TOGGLE_DARKMODE,
  TOGGLE_DARKMODE_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from './constants'

import { getProductFromAPI } from '../../services/request.js'

// import { getTotalProducts} from '../../tool/productService'

function* toggleSaga(action) {
  // yield call(getTotalProducts)
  yield put({ type: TOGGLE_DARKMODE_SUCCESS, isDarkMode: action.isDarkMode })
}

function* getProductSaga(action) {
  try {
    let response = yield call(getProductFromAPI)
    yield put({ type: GET_PRODUCTS_SUCCESS, products: response.data.data })
  }
  catch (err) {
    console.log(err);
    yield put({ type: GET_PRODUCTS_FAIL })
  }


}

function* root() {
  yield takeLatest(TOGGLE_DARKMODE, toggleSaga);
  yield takeLatest(GET_PRODUCTS, getProductSaga);
}

export default root;