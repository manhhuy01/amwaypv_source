import { all } from 'redux-saga/effects';
import Product from '../containers/products/saga'

export default function* AppSaga() {
    yield all([
      Product(),
    ]);
  }