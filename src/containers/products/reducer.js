import uuid from 'uuid/v4'
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_SUCCESS,
  ADD_PRODUCT_TO_CART,
  SUB_PRODUCT_FROM_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './constants'

import {
  PAGE_PRODUCT_LOADED
} from '../../containers/layout/constants'
import products from '../../data/products.json'

let cartInit = { id: uuid(), products: [], totalItem: 0 }
if (typeof localStorage != 'undefined') {
  let savedCarts = JSON.stringify(localStorage.getItem('carts'))
  cartInit = savedCarts != 'null' ? savedCarts : cartInit;
}


const initialState = {
  isDarkMode: false,
  products: products.data,
  isLoading: true,
  isUpdateSuccess: false,
  isUpdating: false,
  carts: [cartInit],
  cartSelected: cartInit
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, isLoading: true }
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products, isLoading: false }
    case PAGE_PRODUCT_LOADED:
    case GET_PRODUCTS_FAIL:
      return { ...state, isLoading: false }
    case UPDATE_PRODUCTS:
      return { ...state, isUpdating: true }
    case UPDATE_PRODUCTS_SUCCESS:
      return { ...state, isUpdating: false, isUpdateSuccess: true }
    case UPDATE_PRODUCTS_FAIL:
      return { ...state, isUpdating: false, isUpdateSuccess: false }
    case ADD_PRODUCT_TO_CART: {
      let cart = state.cartSelected;
      let productIndex = cart.products.findIndex(item => item.product.sku == action.payload.product.sku)
      if (productIndex == -1) {
        cart.products.push({ product: action.payload.product, amount: 1 })

      } else {
        cart.products[productIndex] = { product: action.payload.product, amount: cart.products[productIndex].amount + 1 }

      }
      cart.totalItem += 1;
      let cartIndex = state.carts.findIndex(item => item.id == cart.id)
      if (cartIndex == -1) {
        state.carts.push(cart)
      }
      else {
        state.carts[cartIndex] = cart;
      }
      return { ...state, carts: [...state.carts], cartSelected: { ...cart } }
    }

    case SUB_PRODUCT_FROM_CART: {
      let cart = state.cartSelected;
      let productIndex = cart.products.findIndex(item => item.product.sku == action.payload.product.sku)
      if (productIndex == -1) {
        return state;
      }
      if (cart.products[productIndex].amount > 1) {
        cart.products[productIndex].amount = cart.products[productIndex].amount - 1;
      } else {
        cart.products.splice(productIndex, 1)
      }
      cart.totalItem -= 1;
      let cartIndex = state.carts.findIndex(item => item.id == cart.id)
      if (cartIndex == -1) {
        state.carts.push(cart)
      }
      else {
        state.carts[cartIndex] = cart;
      }
      return { ...state, carts: [...state.carts], cartSelected: { ...cart } }
    }

    case REMOVE_PRODUCT_FROM_CART: {
      let cart = state.cartSelected;
      let productIndex = cart.products.findIndex(item => item.product.sku == action.payload.product.sku)
      if (productIndex == -1) {
        return state;
      }
      cart.totalItem -= cart.products[productIndex].amount;
      cart.products.splice(productIndex, 1)

      let cartIndex = state.carts.findIndex(item => item.id == cart.id)
      if (cartIndex == -1) {
        state.carts.push(cart)
      }
      else {
        state.carts[cartIndex] = cart;
      }
      return { ...state, carts: [...state.carts], cartSelected: { ...cart } }
    }

    default:
      return state;
  }
};