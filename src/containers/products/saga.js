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
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_SUCCESS,
} from './constants'

import { getProductFromAPI, updateProducAPI } from '../../services/request.js'

// import { getTotalProducts} from '../../tool/productService'

function* toggleSaga(action) {
  // yield call(getTotalProducts)
  yield put({ type: TOGGLE_DARKMODE_SUCCESS, isDarkMode: action.isDarkMode })
}

function* getProductSaga() {
  try {
    let response = yield call(getProductFromAPI)
    yield put({ type: GET_PRODUCTS_SUCCESS, products: response.data.data })
  }
  catch (err) {
    yield put({ type: GET_PRODUCTS_FAIL })
  }
}

function* updateProductSaga(){
  try{
    yield call(updateProducAPI)
    yield put({type: UPDATE_PRODUCTS_SUCCESS})
  }
  catch(err) {
    yield put({type: UPDATE_PRODUCTS_FAIL})
  }
}

function* root() {
  yield takeLatest(TOGGLE_DARKMODE, toggleSaga);
  yield takeLatest(GET_PRODUCTS, getProductSaga);
  yield takeLatest(UPDATE_PRODUCTS, updateProductSaga)
}

export default root;