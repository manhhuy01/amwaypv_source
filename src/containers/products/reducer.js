import { TOGGLE_DARKMODE, TOGGLE_DARKMODE_SUCCESS } from './constants'
import products from '../../data/products.json'

const initialState = {
  isDarkMode: false,
  products: products
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      console.log('TOGGLE_DARKMODE')
      return state;
    case TOGGLE_DARKMODE_SUCCESS:
      console.log('TOGGLE_DARKMODE_SUCCESS')
      return { ...state, isDarkMode: action.isDarkMode };
    default:
      return state;
  }
};