/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/
import { NavigationActions } from 'react-navigation'
import { put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { Auth } from 'aws-amplify'

export function * confirmUserLogin ({data}) {
  console.log(`confirmUserLogin`)
  const {authCode, user} = data
  console.log(authCode)
  console.log(user)
  console.log(`confirmUserLogin`)
  const response = yield Auth.confirmSignIn(user, authCode)
  if (response === 'SUCCESS') {
    yield put(AuthActions.confirmLoginSuccess(response))
    console.log('data from confirmLogin: ', response)
  } else {
    console.log('error signing in: ', response)
    yield put(AuthActions.confirmLoginFailure(response))
  }
}

export function * confirmUserSignUp ({data}) {
  const {username, authCode} = data
  const response = yield Auth.confirmSignUp(username, authCode)
  if (response === 'SUCCESS') {
    yield put(AuthActions.confirmSignupSuccess(response))
    yield put(NavigationActions.navigate({
      routeName: 'LoggedInStack'
    }))
  } else {
    console.log('error confirmUserSignUp in: ', response)
    yield put(AuthActions.confirmSignupFailure(response))
  }
}

export function * authenticate ({data}) {
  const {username, password} = data
  const response = yield Auth.signIn(username, password)
  console.log(`authenticate`)
  console.log(response)
  console.log(`authenticate`)
  if (response.username) {
    console.log(`in login...`)
    yield put(AuthActions.logInSuccess({user: response}))
    yield put(AuthActions.showSignInConfirmationModal())
  } else {
    yield put(AuthActions.logInFailure(response))
  }
}

export function * createUser ({data}) {
  const { username, password, email, phoneNumber } = data
  let phone
  const firstTwoDigits = phoneNumber.substring(0, 2)
  if (firstTwoDigits === '+1') {
    phone = phoneNumber
  } else {
    phone = '+1' + phoneNumber
  }
  const response = yield Auth.signUp({
    username,
    password,
    attributes: {
      email,
      phone_number: phone
    }
  })
  // success?
  if (response.user) {
    yield put(AuthActions.signUpSuccess(response))
    console.log(`updating...`)
    console.log(response)
    console.log(`updating...`)
    yield put(AuthActions.showSignUpConfirmationModal())
  } else {
    console.log(`createUser fail`)
    yield put(AuthActions.signUpFailure(response))
  }
}
