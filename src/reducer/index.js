import { combineReducers } from 'redux';
import productReducer from '../containers/products/reducer';
import layoutReducer from '../containers/layout/layoutReducer';
import userReducer from '../containers/user/reducer';
export default combineReducers({ productReducer, layoutReducer, userReducer });