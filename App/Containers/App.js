
import '../Config'
import DebugConfig from '../Config/DebugConfig'
import Amplify, { Auth } from 'aws-amplify'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import config from '../aws-exports'

Amplify.configure(config)
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {authCode: ''}
  }

  onChangeText = (authCode) => { // 2
    this.setState({ authCode })
  }

  signUp = () => {
    Auth.signUp({ // 3
      username: 'myCoolUsername',
      password: 'MyCoolP@ssword2!',
      attributes: {
        phone_number: '+15555555555',
        email: 'yourcoolemail@gmail.com'
      }
    })
    .then(res => {
      console.log('successful signup: ', res)
    })
    .catch(err => {
      console.log('error signing up: ', err)
    })
  }

  confirmUser = () => { // 4
    const { authCode } = this.state
    Auth.confirmSignUp('myCoolUsername', authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
