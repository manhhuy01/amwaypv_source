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
  GET_FULL_INFO_READ_ONLY_CART,
} from './constants'

import {
  PAGE_PRODUCT_LOADED
} from '../../containers/layout/constants'
import products from '../../data/products.json'

let cartInit = { id: uuid(), products: [], totalItem: 0, totalDp: 0, totalPv: 0, totalCp: 0, selected: true }
const readOnlyCart = { products: [], totalItem: 0, totalDp: 0, totalPv: 0, totalCp: 0, }
let carts = []
if (typeof localStorage !== 'undefined') {
  let savedCarts = JSON.parse(localStorage.getItem('carts'))
  carts = savedCarts !== null ? savedCarts : [cartInit];
  cartInit = carts.find(x => x.selected);
}


const initialState = {
  isDarkMode: false,
  products: products.data,
  isLoading: true,
  isUpdateSuccess: false,
  isUpdating: false,
  carts: carts,
  cartSelected: cartInit,
  readOnlyCart: { ...readOnlyCart },
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
      let productIndex = cart.products.findIndex(item => item.product.sku === action.payload.product.sku)
      if (productIndex === -1) {
        cart.products.push({ product: action.payload.product, amount: 1 })

      } else {
        cart.products[productIndex] = { product: action.payload.product, amount: cart.products[productIndex].amount + 1 }

      }
      cart.totalItem += 1;
      cart.totalPv += Number(action.payload.product.pv);
      cart.totalDp += Number(action.payload.product.dp);
      cart.totalCp += Number(action.payload.product.cp);
      let cartIndex = state.carts.findIndex(item => item.id === cart.id)
      if (cartIndex === -1) {
        state.carts.push(cart)
      }
      else {
        state.carts[cartIndex] = cart;
      }
      localStorage.setItem('carts', JSON.stringify(state.carts))
      return { ...state, carts: [...state.carts], cartSelected: { ...cart } }
    }

    case SUB_PRODUCT_FROM_CART: {
      let cart = state.cartSelected;
      let productIndex = cart.products.findIndex(item => item.product.sku === action.payload.product.sku)
      if (productIndex === -1) {
        return state;
      }
      if (cart.products[productIndex].amount > 0) {
        cart.products[productIndex].amount = cart.products[productIndex].amount - 1;
      } else {
        cart.products.splice(productIndex, 1)
      }
      cart.totalItem -= 1;
      cart.totalPv -= Math.abs(Number(action.payload.product.pv));
      cart.totalDp -= Number(action.payload.product.dp);
      cart.totalCp -= Number(action.payload.product.cp);
      let cartIndex = state.carts.findIndex(item => item.id === cart.id)
      if (cartIndex === -1) {
        state.carts.push(cart)
      }
      else {
        state.carts[cartIndex] = cart;
      }
      localStorage.setItem('carts', JSON.stringify(state.carts))
      return { ...state, carts: [...state.carts], cartSelected: { ...cart } }
    }

    case REMOVE_PRODUCT_FROM_CART: {
      let cart = state.cartSelected;
      let productIndex = cart.products.findIndex(item => item.product.sku === action.payload.product.sku)
      if (productIndex === -1) {
        return state;
      }
      cart.totalItem -= cart.products[productIndex].amount;
      cart.totalPv -= Math.abs(Number(action.payload.product.pv) * cart.products[productIndex].amount);
      cart.totalDp -= Number(action.payload.product.dp) * cart.products[productIndex].amount;
      cart.totalCp -= Number(action.payload.product.cp) * cart.products[productIndex].amount;
      cart.products.splice(productIndex, 1)

      let cartIndex = state.carts.findIndex(item => item.id === cart.id)
      if (cartIndex === -1) {
        state.carts.push(cart)
      }
      else {
        state.carts[cartIndex] = cart;
      }
      localStorage.setItem('carts', JSON.stringify(state.carts))
      return { ...state, carts: [...state.carts], cartSelected: { ...cart } }
    }
    case GET_FULL_INFO_READ_ONLY_CART:
      let cart = { products: [], totalItem: 0, totalDp: 0, totalPv: 0, totalCp: 0, }

      let products = state.products
      let cartProducts = []
      let cartDetails = action.cart.cartDetail.split('~')
      if(!(cartDetails.length === 1 && cartDetails[0]==='')){

        cartDetails.forEach(item => {
          let detail = item.split('-')
          cart.totalItem += Number(detail[0])
          const product = products.find(p => p.sku === detail[1])
          if (product) {
            cartProducts.push({ product, amount: Number(detail[0]) })
            cart.totalCp += Number(product.cp) * Number(detail[0])
            cart.totalPv += Number(product.pv) * Number(detail[0])
            cart.totalDp += Number(product.dp) * Number(detail[0])

          } else {
            cartProducts.push({ product: undefined, amount: Number(detail[0]) })
          }
        });
      }

      cart.products = cartProducts

      return { ...state, readOnlyCart: cart }
    default:
      return state;
  }
};