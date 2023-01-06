import axios from 'axios';
// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 5000,
    headers: {
        "Content-Type": 'applicetion/json;charset=utf-8'
    }
})

// 请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        typeof config.headers.set == 'function' && config.headers.set('token', localStorage.getIte('token') || '')
    }
    return config
})

service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code != 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    console.log(err);
})

export default service