import axios from 'axios'

export const API = axios.create({
    baseURL: 'https://mdk-api.onrender.com/',
    validateStatus(status) {
        return status >= 200 && status < 500
    }
})
export default defineNuxtPlugin(() => { });