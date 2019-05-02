import { SWITCH_DISPLAY,PAGE_PRODUCT_LOADED, UPDATE_CATEGORY } from './constants'

export const switchDisplay = () => ({ type: SWITCH_DISPLAY })
export const pageProductLoaded = () => ({ type: PAGE_PRODUCT_LOADED })
export const updateCategory = (category) => ({ type: UPDATE_CATEGORY, category })
