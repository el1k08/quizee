import http from './HttpService'

export function signUpUser(authData) {
  console.log('API KEY: ', `${process.env.REACT_APP_FB_SIGN_UP}${process.env.REACT_APP_FB_API}`)
  return http.post(`${process.env.REACT_APP_FB_SIGN_UP}${process.env.REACT_APP_FB_API}`, authData)
}

export function signInUser(authData) {
  return http.post(`${process.env.REACT_APP_FB_SIGN_IN}${process.env.REACT_APP_FB_API}`, authData)
}

const service = {
  signUpUser,
  signInUser,
};

export default service;