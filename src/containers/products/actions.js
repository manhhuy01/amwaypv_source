import {
    TOGGLE_DARKMODE,
    GET_PRODUCTS,
    UPDATE_PRODUCTS,
    ADD_PRODUCT_TO_CART,
    SUB_PRODUCT_FROM_CART,
    REMOVE_PRODUCT_FROM_CART,
    GET_FULL_INFO_READ_ONLY_CART,
} from './constants'

export const toggleDarkMode = isDarkMode => ({
    type: TOGGLE_DARKMODE, isDarkMode
});

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const updateProducts = () => ({
    type: UPDATE_PRODUCTS,
})


export const addProductToCart = (payload) => ({
    type: ADD_PRODUCT_TO_CART,
    payload,
})

export const subProductFromCart = (payload) => ({
    type: SUB_PRODUCT_FROM_CART,
    payload,
})

export const removeProductFromCart = (payload) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    payload,
})

export const getFullInfoReadOnlyCart = (cart) => ({
    type: GET_FULL_INFO_READ_ONLY_CART,
    cart
})