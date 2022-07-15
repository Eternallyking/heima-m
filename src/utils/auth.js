import storage from './storage'
const HOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(HOKEN_KEY)
export const setToken = (token) => storage.set(HOKEN_KEY, token)
export const removeToken = () => storage.get(HOKEN_KEY)
