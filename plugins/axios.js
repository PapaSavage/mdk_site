import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://127.0.0.1:9010/',
    validateStatus(status) {
        return status >= 200 && status < 500
    }
})
export default defineNuxtPlugin(() => { });