import {
  SWITCH_DISPLAY,
  PAGE_PRODUCT_LOADED,
  UPDATE_CATEGORY
} from './constants'
// import products from '../../data/products.json'

let isGrid = true;
if (typeof localStorage !== 'undefined') {
  isGrid = JSON.parse(localStorage.getItem('isGrid')) == null ? true : JSON.parse(localStorage.getItem('isGrid'))
}

const initialState = {
  isGrid,
  isPageProductLoaded: false,
  category: 'TẤT CẢ',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_DISPLAY:
      localStorage.setItem('isGrid', JSON.stringify(!state.isGrid))
      return { ...state, isGrid: !state.isGrid };
    case PAGE_PRODUCT_LOADED:
      return { ...state, isPageProductLoaded: true};
    case UPDATE_CATEGORY: 
      return {...state, category: action.category}
    default:
      return state;
  }
};