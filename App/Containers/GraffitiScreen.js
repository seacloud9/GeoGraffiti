import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import Secrets from 'react-native-config'
import {
  ViroARSceneNavigator
} from 'react-viro'
import GeoGraffiti from '../Xr/GeoGraffiti'

// Styles
import styles from './Styles/GraffitiScreenStyles'
// var GeoGraffiti = require('../Xr/GeoGraffiti')
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: Secrets.VIRO
}
// Sets the default scene you want for AR and VR
var UNSET = 'UNSET'
var AR_NAVIGATOR_TYPE = 'AR'
// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET
export default class GraffitiScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this)
    this._getARNavigator = this._getARNavigator.bind(this)
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this)
    this._exitViro = this._exitViro.bind(this)
  }
  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector () {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Geo Graffiti</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator () {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: GeoGraffiti}} />
    )
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress (navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro () {
    this.setState({
      navigatorType: UNSET
    })
  }

  renderAROptions () {
    if (this.state.navigatorType === UNSET) {
      return this._getExperienceSelector()
    } else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
      return this._getARNavigator()
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {
         this._getARNavigator()
        }
      </View>
    )
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
})
