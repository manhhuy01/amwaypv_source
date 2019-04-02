import { combineReducers } from 'redux';
import productReducer from '../containers/products/reducer';
import layoutReducer from '../containers/layout/layoutReducer';
export default combineReducers({ productReducer, layoutReducer });