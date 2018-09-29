import React, { Component } from 'react'
import { View, StatusBar, ActivityIndicator } from 'react-native'
import { Auth } from 'aws-amplify'
import { Colors } from '../Themes'
import { connect } from 'react-redux'
// import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      isLoading: true,
      auth: props.auth
    }
  }

  async componentDidMount () {
    StatusBar.setHidden(true)
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user, isLoading: false })
      this.props.navigation.navigate('App')
    } catch (err) {
      this.setState({ isLoading: false })
      this.props.navigation.navigate('Auth')
    }
  }
  async componentWillReceiveProps (nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user, ...nextProps })
    } catch (err) {
      this.setState({ user: {}, ...nextProps })
    }
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
  auth: state.auth.hasAuthenticated
})

export default connect(mapStateToProps)(RootContainer)
