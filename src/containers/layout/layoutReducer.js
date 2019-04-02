import {
  SWITCH_DISPLAY
} from './constants'
// import products from '../../data/products.json'

let isGrid = true;
if (typeof localStorage !== 'undefined') {
  isGrid = JSON.parse(localStorage.getItem('isGrid')) == null ? true : JSON.parse(localStorage.getItem('isGrid'))
}

const initialState = {
  isGrid,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_DISPLAY:
      localStorage.setItem('isGrid', JSON.stringify(!state.isGrid))
      return { ...state, isGrid: !state.isGrid };

    default:
      return state;
  }
};