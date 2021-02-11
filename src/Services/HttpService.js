import axios from 'axios';

axios.create({
  baseURL: process.env.REACT_APP_FB_API
})

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}

export default http;