import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authRequest: ['data'],
  authSuccess: ['payload'],
  authFailure: null,
  signUp: ['data'],
  logIn: ['data'],
  logInSuccess: ['user'],
  logInFailure: ['err'],
  logOut: null,
  signUpSuccess: ['data'],
  signUpFailure: ['err'],
  showSignInConfirmationModal: null,
  showSignUpConfirmationModal: null,
  confirmSignup: ['data'],
  confirmSignupSuccess: ['data'],
  confirmSignupFailure: ['err'],
  confirmLogin: ['data'],
  confirmLoginSuccess: ['user'],
  confirmLoginFailure: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  isAuthenticating: false,
  user: null,
  signUpError: false,
  signInError: false,
  showSignUpConfirmationModal: false,
  showSignInConfirmationModal: false,
  confirmSignUpError: false,
  confirmLoginError: false,
  signInErrorMessage: '',
  signUpErrorMessage: '',
  confirmLoginErrorMessage: '',
  confirmSignUpErrorMessage: ''
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => state.merge({ fetching: true, data, payload: null })
// successful api lookup
export const success = (state, {data}) => {
  const { user } = data
  console.log('success')
  console.log(user)
  return state.merge({ fetching: false, error: null, user: user })
}

export const confirmSignupSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null })
}

export const showSignUpConfirmationModal = (state, action) => {
  return state.merge({ fetching: false, error: null, showSignUpConfirmationModal: true, isAuthenticating: true })
}

export const showSignInConfirmationModal = (state, action) => {
  return state.merge({ fetching: false, error: null, showSignInConfirmationModal: true, isAuthenticating: true })
}

export const failure = (state, action) => {
  const { err } = action
  return state.merge({ fetching: false, error: true, err })
}
/*
export const confirmUserLogin = (authCode) => {
  return (dispatch, getState) => {
    dispatch({type: 'Auth/CONFIRM_LOG_IN'})
    const {auth: { user }} = getState()
    console.log('state: ', getState())
    Auth.confirmSignIn(user, authCode)
      .then(data => {
        console.log('data from confirmLogin: ', data)
        dispatch({type: 'Auth/CONFIRM_LOGIN_SUCCESS', user: data})
      })
      .catch(err => {
        console.log('error signing in: ', err)
        dispatch({type: 'Auth/CONFIRM_LOGIN_FAILURE', err: err})
      })
  }
}

export const confirmUserSignUp = (username, authCode) => {
  return (dispatch) => {
    dispatch({type: 'Auth/CONFIRM_SIGN_UP'})
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        console.log('data from confirmSignUp: ', data)
        dispatch({type: 'Auth/CONFIRM_SIGN_UP_SUCCESS', user: data})
        setTimeout(() => {
          Alert.alert('Successfully Signed Up!', 'Please Sign')
        }, 0)
      })
      .catch(err => {
        console.log('error signing up: ', err)
        dispatch({type: 'Auth/CONFIRM_SIGN_UP_FAILURE', err: err})
      })
  }
}

export const authenticate = (username, password) => {
  return (dispatch) => {
    dispatch({type: 'Auth/LOG_IN'})
    Auth.signIn(username, password)
      .then(user => {
        dispatch({type: 'Auth/LOG_IN_SUCCESS', user: user})
        dispatch({type: 'Auth/SHOW_SIGN_IN_CONFIRMATION_MODAL'})
      })
      .catch(err => {
        console.log('errror from signIn: ', err)
        dispatch({type: 'Auth/LOG_IN_FAILURE', err: err})
      })
  }
}
*/

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.SIGN_UP]: request,
  [Types.AUTH_FAILURE]: failure,
  [Types.LOG_IN]: request,
  [Types.LOG_IN_SUCCESS]: success,
  [Types.LOG_IN_FAILURE]: failure,
  [Types.LOG_OUT]: request,
  [Types.SIGN_UP_SUCCESS]: success,
  [Types.SIGN_UP_FAILURE]: failure,
  [Types.SHOW_SIGN_IN_CONFIRMATION_MODAL]: showSignInConfirmationModal,
  [Types.SHOW_SIGN_UP_CONFIRMATION_MODAL]: showSignUpConfirmationModal,
  [Types.CONFIRM_SIGNUP]: request,
  [Types.CONFIRM_SIGNUP_SUCCESS]: confirmSignupSuccess,
  [Types.CONFIRM_SIGNUP_FAILURE]: failure,
  [Types.CONFIRM_LOGIN]: request,
  [Types.CONFIRM_LOGIN_SUCCESS]: success,
  [Types.CONFIRM_LOGIN_FAILURE]: failure
})
