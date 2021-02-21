import UserService from '../../Services/UserService'
import { AUTH_SUCCESS, AOTH_LOGOUT } from './actionType'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let response
    if (isLogin) {
      response = await UserService.signInUser(authData)
    } else {
      response = await UserService.signUpUser(authData)
    }

    const { data } = response

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
   
    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(data.idToken))
    dispatch(authLogout(data.expiresIn))

      
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function authLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AOTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}