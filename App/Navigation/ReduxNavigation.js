import React from 'react'
import { connect } from 'react-redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import {PrimaryNav} from './AppNavigation'

// here is our redux-aware smart component
function ReduxNavigation (props) {
  const addListener = createReduxBoundAddListener('root')
  const { dispatch, nav } = props
  const navigation = {
    dispatch,
    state: nav,
    addListener
  }

  return <PrimaryNav navigation={navigation} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
