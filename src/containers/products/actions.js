import { TOGGLE_DARKMODE, GET_PRODUCTS, UPDATE_PRODUCTS } from './constants'

export const toggleDarkMode = isDarkMode => ({
    type: TOGGLE_DARKMODE, isDarkMode
});

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const updateProducts = () => ({
    type: UPDATE_PRODUCTS,
})