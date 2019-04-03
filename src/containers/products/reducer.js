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
// import products from '../../data/products.json'

const initialState = {
  isDarkMode: false,
  products: [],
  isLoading: false,
  isUpdateSuccess: false,
  isUpdating: false,
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
      return { ...state, isLoading: true }
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products, isLoading: false }
    case GET_PRODUCTS_FAIL:
      return { ...state, isLoading: false }
    case UPDATE_PRODUCTS:
      return { ...state, isUpdating: true }
    case UPDATE_PRODUCTS_SUCCESS:
      return { ...state, isUpdating: false, isUpdateSuccess: true }
    case UPDATE_PRODUCTS_FAIL:
      return { ...state, isUpdating: false, isUpdateSuccess: false }
    default:
      return state;
  }
};