import axios from 'axios'
import { url } from '../utils/config'

export const getProductFromAPI =() => {
    return axios.get(`${url}/products`)
}