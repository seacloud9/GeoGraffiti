import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

export class currentUser {
  user = {}
  static setCurrentUser = (_user) => {
    this.user = _user
  }

  static getCurrentUser = (_user) => {
    return this.user
  }
}

const { Types, Creators } = createActions({
  authRequest: ['data'],
  authSuccess: ['payload'],
  authFailure: null,
  signUp: ['data'],
  logIn: ['data'],
  logInSuccess: ['data'],
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
  confirmLoginSuccess: ['data'],
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
  hasAuthenticated: false,
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
export const request = (state, { data }) => state.merge({ fetching: true, data, payload: null, hasAuthenticated: false })
// successful api lookup
/*
the hackway for now
https://github.com/aws-amplify/amplify-js/issues/1573
https://stackoverflow.com/questions/50375332/typeerror-user-sendmfacode-is-not-a-function-redux-saga-and-aws-amplify
https://github.com/aws-amplify/amplify-js/issues/192#issuecomment-389309056
*/
export const success = (state, {data}) => {
  const { user } = data
  currentUser.setCurrentUser(user)
  return state.merge({ fetching: false, error: null, user: user })
}
export const confirmLoginSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, hasAuthenticated: true, isAuthenticating: false, showSignInConfirmationModal: false })
}

export const confirmSignupSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, hasAuthenticated: true, isAuthenticating: false, showSignUpConfirmationModal: false })
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
  [Types.CONFIRM_LOGIN_SUCCESS]: confirmLoginSuccess,
  [Types.CONFIRM_LOGIN_FAILURE]: failure
})
