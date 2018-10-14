import React, { Component } from 'react'
import { View, StatusBar, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Auth } from 'aws-amplify'
import { Colors } from '../Themes'
import { connect } from 'react-redux'
// import {currentUser} from '../Redux/AuthRedux'

// import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      isLoading: true,
      auth: props.auth,
      nav: props.nav
    }
  }

  signInUser = async (nextProps) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState((nextProps ? {user, isLoading: false, ...nextProps} : { user, isLoading: false }))
      const navigateAction = NavigationActions.navigate({
        routeName: 'LoggedInStack'
      })
      this.getCurrentUser()
      this.props.navigation.dispatch(navigateAction)
    } catch (err) {
      console.log(err)
      nextProps ? this.setState({ isLoading: false }, () => {
      }) : this.redirectUserToSignIn()
    }
  }

  redirectUserToSignIn = (nextProps) => {
    this.setState((nextProps ? { isLoading: false, ...nextProps } : { isLoading: false }))
    const navigateAction = NavigationActions.navigate({
      routeName: 'NotLoggedInStack'
    })
    this.props.navigation.dispatch(navigateAction)
  }

  componentDidMount () {
    StatusBar.setHidden(true)
    this.signInUser()
  }

  componentWillReceiveProps (nextProps) {
    this.signInUser(nextProps)
  }

  getCurrentUser () {
    Auth.currentUserInfo().then(currentAccount => {
      this.setState({
        currentAccount: currentAccount,
        isAuthenticated: true,
        isLoading: false
      })
    }).catch(error => {
      this.setState({
        authError: error,
        currentAccount: {},
        isAuthenticated: false,
        isLoading: false
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primary} />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.hasAuthenticated,
  user: state.auth.user,
  nav: state.nav
})

export default connect(mapStateToProps)(RootContainer)
