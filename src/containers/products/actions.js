import { TOGGLE_DARKMODE } from './constants'

export const toggleDarkMode = isDarkMode => ({
    type: TOGGLE_DARKMODE, isDarkMode
});