import { all } from 'redux-saga/effects';
import Product from '../containers/products/saga'
import User from '../containers/user/saga'

export default function* AppSaga() {
    yield all([
      Product(),
      User(),
    ]);
  }