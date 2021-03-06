import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import Secrets from 'react-native-config'
import { Button } from 'react-native-elements'
import {
  ViroARSceneNavigator,
  ViroMaterials,
  ViroSphere
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
class GraffitiScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      sphereBushArray: [],
      localTransform: {},
      ...props
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

  getGeoGraffiti () {
    return (
      <GeoGraffiti
        location={this.state.location}
        onLocationUpdate={this._onLocationUpdate}
        sphereBushArray={this.state.sphereBushArray}
           />
    )
  }

  _onPaint = () => {
    let _sphereBushArray = this.state.sphereBushArray.concat()
    _sphereBushArray.push(<ViroSphere
      heightSegmentCount={20}
      widthSegmentCount={20}
      radius={2}
      scale={[0.02, 0.02, 0.02]}
      position={this.state.localTransform.position}
      key={this.state.sphereBushArray.length}
      materials={['basic']}
   />)
    this.setState({sphereBushArray: _sphereBushArray})
    this.timer = setTimeout(this._onPaint, 200)
  }

  _stopTimer = () => {
    clearTimeout(this.timer)
  }

  _onLocationUpdate = (location) => {
    // console.log(JSON.stringify(location))
    this.setState({localTransform: location})
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator () {
    return (
      <View style={{flex: 1, width: '100%', justifyContent: 'flex-end', backgroundColor: 'transparent'}}>
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: this.getGeoGraffiti.bind(this)}}
          />
        <Button
          buttonStyle={{opacity: 0.6, backgroundColor: '#104aa8', borderWidth: 1, borderColor: '#ffffff', borderRadius: 10, margin: 10}}
          leftIcon={{
            color: 'white',
            name: 'spray',
            type: 'material-community',
            size: 18
          }}
          onPress={this._onPaint.bind(this)}
          onPressOut={this._stopTimer.bind(this)}
          title='Grafitti' />
      </View>
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

const mapStateToProps = (state) => {
  return {
    location: state.geo.location
  }
}
export default connect(mapStateToProps, null)(GraffitiScreen)

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

ViroMaterials.createMaterials({
  defaultSphereBush: {
    diffuseColor: '#0286f4',
    specularTexture: require('../assets/materials/metal.jpg'),
    diffuseIntensity: 0.7,
    shininess: 0.4,
    lightingModel: 'Phong'
  },
  defaultSphereBushLambert: {
    diffuseColor: '#0286f4',
    diffuseTexture: require('../assets/materials/metal.jpg'),
    diffuseIntensity: 0.7,
    shininess: 0.4,
    lightingModel: 'Lambert'
  },
  basic: {
    diffuseColor: '#0286f4',
    diffuseTexture: require('../assets/materials/metal.jpg')
  }
})
