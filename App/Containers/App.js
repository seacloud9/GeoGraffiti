
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
