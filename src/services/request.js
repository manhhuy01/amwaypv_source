import axios from 'axios'
import { url } from '../utils/config'

export const getProductFromAPI =() => {
    return axios.get(`${url}/products`)
}

export const updateProducAPI =() => {
    return axios.post(`${url}/updateProducts`)
}

export const login =(user) => {
    return axios.post(`${url}/login`, user)
}
