import { LOGIN, LOGOUT, } from './constants'

export const login = (user) => ({ type: LOGIN, user })
export const logout = () => ({ type: LOGOUT })