import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import { Fonts } from '../Themes'
import Input from '../Components/Input'
import Button from '../Components/Button'

const initialState = {
  username: '',
  password: '',
  accessCode: ''
}

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signIn = () => {
    const { username, password } = this.state
    this.props.dispatchAuthenticate(username, password)
  }

  confirm = () => {
    const { authCode } = this.state
    this.props.dispatchConfirmUserLogin(this.state.user, authCode)
  }

  componentWillReceiveProps (nextProps) {
    const {auth: {showSignInConfirmationModal}} = nextProps
    if (!showSignInConfirmationModal && this.props.auth.showSignInConfirmationModal && !nextProps.user) {
     // this.setState(initialState)
    }

    if (nextProps.user) {
      this.setState(nextProps)
    }
  }

  render () {
    const { auth: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
      showSignInConfirmationModal
    }} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../assets/shape.png')}
            style={styles.headingImage}
            resizeMode='contain'
          />
        </View>
        <Text style={[styles.greeting]}>
          Welcome back,
        </Text>
        <Text style={[styles.greeting2]}>
          sign in to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder='User Name'
            type='username'
            onChangeText={this.onChangeText}
            value={this.state.username}
          />
          <Input
            placeholder='Password'
            type='password'
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
          />
        </View>

        <Button
          isLoading={isAuthenticating}
          title='Sign In'
          onPress={this.signIn.bind(this)}
        />
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>{signInErrorMessage}</Text>
        {
          showSignInConfirmationModal && (
            <Modal
              visible={(this.state.showSignInConfirmationModal || !this.state.hasAuthed)}
            >
              <View style={styles.modal}>
                <Input
                  placeholder='Authorization Code'
                  type='authCode'
                  onChangeText={this.onChangeText}
                  value={this.state.authCode}
                  keyboardType='numeric'
                />
                <Button
                  title='Confirm'
                  onPress={this.confirm.bind(this)}
                  isLoading={isAuthenticating}
                />
              </View>
            </Modal>
          )
        }
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchConfirmUserLogin: (user, authCode) => dispatch(AuthActions.confirmLogin({user, authCode})),
    dispatchAuthenticate: (username, password) => dispatch(AuthActions.logIn({username, password}))
  }
}

const mapStateToProps = state => ({
  hasAuthed: state.auth.hasAuthenticated,
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: Fonts.type.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: Fonts.type.light
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: Fonts.type.light
  }
})
