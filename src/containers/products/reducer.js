import {
  TOGGLE_DARKMODE,
  TOGGLE_DARKMODE_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from './constants'
// import products from '../../data/products.json'

const initialState = {
  isDarkMode: false,
  products: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      console.log('TOGGLE_DARKMODE')
      return state;
    case TOGGLE_DARKMODE_SUCCESS:
      console.log('TOGGLE_DARKMODE_SUCCESS')
      return { ...state, isDarkMode: action.isDarkMode };
    case GET_PRODUCTS: 
      return {...state, isLoading: true}
    case GET_PRODUCTS_SUCCESS: 
      return {...state, products: action.products, isLoading: false}
    case GET_PRODUCTS_FAIL: 
      return {...state, isLoading: false}
    default:
      return state;
  }
};