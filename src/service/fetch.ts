import axios from 'axios';

const request = axios.create({
  baseURL: '/',
})


request.interceptors.request.use(
  config=> config, 
  error => Promise.reject(error)
)

request.interceptors.response.use(
  res=>{
    if(res?.status === 200) {
      return res?.data
    } else {
      return {
        code: 1,
        msg: "unknown",
        data: null,
      }
    }
  }, err => Promise.reject(err)
)


export default request;