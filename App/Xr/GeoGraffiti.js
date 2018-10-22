'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native'

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroSphere,
  ViroMaterials
} from 'react-viro'

export default class GeoGraffiti extends Component {
  constructor (props) {
    super(props)

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      localTransform: {},
      northPointX: 0,
      northPointZ: 0,
      southPointX: 0,
      southPointZ: 0,
      eastPointX: 0,
      eastPointZ: 0,
      westPointX: 0,
      westPointZ: 0,
      ...props
    }
    this.timer = null
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this)
    this._latLongToMerc = this._latLongToMerc.bind(this)
    this._transformPointToAR = this._transformPointToAR.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState(nextProps)
  }

  render () {
    // console.log(this.props.sphereBushArray)
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} onCameraTransformUpdate={this._onCamerMove} >
        {
          this.props.sphereBushArray
        }
      </ViroARScene>
    )
  }

  _onCamerMove = (obj) => {
    this.setState({localTransform: obj.cameraTransform})
    this.props.onLocationUpdate(this.state.localTransform)
  }

  _onInitialized (state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      // hard coded location for now
      var currentLocation = this._transformPointToAR(this.props.location.coords.latitude, this.props.location.coords.longitude)
      var northPoint = this._transformPointToAR(47.618574, -122.338475)
      var eastPoint = this._transformPointToAR(47.618534, -122.338061)
      var westPoint = this._transformPointToAR(47.618539, -122.338644)
      var southPoint = this._transformPointToAR(47.618210, -122.338455)
      console.log('currentLocation')
      console.log(currentLocation)
      console.log('currentLocation')
      this.setState({
        northPointX: northPoint.x,
        northPointZ: northPoint.z,
        southPointX: southPoint.x,
        southPointZ: southPoint.z,
        eastPointX: eastPoint.x,
        eastPointZ: eastPoint.z,
        westPointX: westPoint.x,
        westPointZ: westPoint.z,
        text: 'AR Init called.'
      })
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Prompt user to move phone around
      console.log('fail...')
    }
  }

  _latLongToMerc (latDeg, lonDeg) {
    var lonRad = (lonDeg / 180.0 * Math.PI)
    var latRad = (latDeg / 180.0 * Math.PI)
    var smA = 6378137.0
    var xmeters = smA * lonRad
    var ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad))
    return ({x: xmeters, y: ymeters})
  }

  _transformPointToAR (lat, long) {
    var objPoint = this._latLongToMerc(lat, long)
    var devicePoint = this._latLongToMerc(lat, long)
    // console.log('objPointZ: ' + objPoint.y + ', objPointX: ' + objPoint.x)
    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y
    var objFinalPosX = objPoint.x - devicePoint.x
  // flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return ({x: objFinalPosX, z: -objFinalPosZ})
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  RedTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center'
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
  test: {
    diffuseColor: '#0286f4',
    diffuseTexture: require('../assets/materials/metal.jpg')
  }
})

GeoGraffiti.propTypes = {
  location: PropTypes.object.isRequired
}

module.exports = GeoGraffiti
