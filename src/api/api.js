import axios from 'axios'

const api = axios.create({
    baseURL: 'https://purificadora-emperador.herokuapp.com/api/v1',
    // baseURL: 'http://localhost:8001/api/v1',
})

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.withCredentials = true

export default api