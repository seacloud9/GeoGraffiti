import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal
} from 'react-native'

import { connect } from 'react-redux'

import { Fonts } from '../Themes'
import AuthActions from '../Redux/AuthRedux'

import Input from '../Components/Input'
import Button from '../Components/Button'

const initialState = {
  username: '',
  password: '',
  email: '',
  phone_number: '',
  authCode: ''
}

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {...props, initialState}
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signUp = () => {
    const { username, password, email, phone_number } = this.state
    this.props.dispatchCreateUser(username, password, email, phone_number)
  }

  confirm = () => {
    const { authCode, username } = this.state
    this.props.dispatchConfirmUser(username, authCode)
  }

  componentWillReceiveProps (nextProps) {
    const {auth: { showSignUpConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    } else {
      this.setState(nextProps)
    }
  }

  render () {
    const { auth: {
      showSignUpConfirmationModal,
      isAuthenticating,
      signUpError,
      signUpErrorMessage
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
        <Text style={styles.greeting}>
          Welcome,
        </Text>
        <Text style={styles.greeting2}>
          sign up to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            value={this.state.username}
            placeholder='User Name'
            type='username'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.email}
            placeholder='Email'
            type='email'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.password}
            placeholder='Password'
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />
          <Input
            placeholder='Phone Number'
            type='phone_number'
            keyboardType='numeric'
            onChangeText={this.onChangeText}
            value={this.state.phone_number}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
          isLoading={isAuthenticating}
        />
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
        {
          showSignUpConfirmationModal && (
            <Modal
              visible={(this.state.showSignUpConfirmationModal && !this.state.hasAuthed)}
              onRequestClose={() => {}}>
              <View style={styles.modal}>
                <Input
                  style={{height: 45,
                    width: 150,
                    marginBottom: 15,
                    borderBottomWidth: 1.5,
                    fontSize: 16,
                    borderBottomColor: '#FF1493',
                    fontFamily: 'Lato-Light'
                  }}
                  placeholder='Authorization Code'
                  type='authCode'
                  keyboardType='numeric'
                  onChangeText={this.onChangeText}
                  value={this.state.authCode}
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

const mapStateToProps = state => ({
  hasAuthed: state.auth.hasAuthenticated,
  user: state.auth.user,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchConfirmUser: (username, authCode) => dispatch(AuthActions.confirmSignup({username, authCode})),
    dispatchCreateUser: (username, password, email, phoneNumber) => dispatch(AuthActions.signUp({username, password, email, phoneNumber}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontFamily: Fonts.type.light,
    fontSize: 24
  },
  greeting2: {
    fontFamily: Fonts.type.light,
    color: '#666',
    fontSize: 24,
    marginTop: 5
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontFamily: Fonts.type.base,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
})
