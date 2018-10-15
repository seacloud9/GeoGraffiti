'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {StyleSheet} from 'react-native'

import {
  ViroARScene,
  ViroText,
  ViroConstants
} from 'react-viro'

export default class GeoGraffiti extends Component {
  constructor (props) {
    super(props)

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
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

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this)
    this._latLongToMerc = this._latLongToMerc.bind(this)
    this._transformPointToAR = this._transformPointToAR.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState(nextProps)
  }

  render () {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[0.2, 2, 0.2]} position={[0, -2, -5]} style={styles.helloWorldTextStyle} />
        <ViroText text='North Text' scale={[3, 3, 3]} transformBehaviors={['billboard']} position={[this.state.northPointX, 0, this.state.northPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text='South Text' scale={[3, 3, 3]} transformBehaviors={['billboard']} position={[this.state.southPointX, 0, this.state.southPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text='West Text' scale={[3, 3, 3]} transformBehaviors={['billboard']} position={[this.state.westPointX, 0, this.state.westPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text='East Text' scale={[3, 3, 3]} transformBehaviors={['billboard']} position={[this.state.eastPointX, 0, this.state.eastPointZ]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    )
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
    console.log('objPointZ: ' + objPoint.y + ', objPointX: ' + objPoint.x)
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
  }
})

GeoGraffiti.propTypes = {
  location: PropTypes.object.isRequired
}

module.exports = GeoGraffiti
