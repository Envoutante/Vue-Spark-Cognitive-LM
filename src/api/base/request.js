import axios from 'axios'

const request = axios.create({
  // baseURL: '/api',
  timeout: 8000,
})

// request interceptor
request.interceptors.request.use(
  (config) => {
    console.log('终端打印：' + JSON.stringify(config))
    config.url = 'https://cn-cd-dx-tmp7.natfrp.cloud:28319' + config.url

    return config
  },

  (error) => {
    console.log('终端报错：' + error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  (response) => {
    console.log(response.data)
    const res = response.data
    console.log(res.ret)
    if (res.ret !== 0) {
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },

  (error) => {
    console.log('终端报错：' + error)
    return Promise.reject(error)
  }
)

export default request
