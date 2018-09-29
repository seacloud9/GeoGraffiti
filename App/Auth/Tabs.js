import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import { Colors, Fonts } from '../Themes'
import SignIn from './SignIn'
import SignUp from './SignUp'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

const routes = {
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/signInButton.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/signUpButton.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  }
}

const routeConfig = {
  tabBarOptions: {
    showLabel: true,
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.secondary,
    indicatorStyle: { backgroundColor: Colors.secondary },
    labelStyle: {
      fontFamily: Fonts.type.base,
      fontSize: 12
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3
    }
  }
}

export default createBottomTabNavigator(routes, routeConfig)
