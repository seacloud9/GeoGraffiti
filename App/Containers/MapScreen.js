import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import { Location } from 'expo-location'
import GeoActions from '../Redux/GeoRedux'
import { Button } from 'react-native-elements'
import { Permissions } from 'expo-permissions'
// Styles
import styles from './Styles/MapScreenStyle'

class MapScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    region: null
  }

  async componentDidMount () {
    try {
      const status = await Permissions.askAsync(Permissions.LOCATION)
      if (status.status !== 'granted') {
        throw new Error('No permission!')
      }
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      this.props.geoSet({location})
      this.setState({ location: location.coords })
    } catch (e) {
      console.log('error', e)
    }
  }

  findCurrentLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    } else {
      try {
        let location = await Location.getCurrentPositionAsync({})
        this.props.geoSet({location})
        this.setState({ location })
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  renderMap () {
    if (this.state.location) {
      return (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            showsUserLocation
            region={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0121
            }}
          />
          <Button
            buttonStyle={{opacity: 0.6, backgroundColor: '#104aa8', borderWidth: 1, borderColor: '#ffffff', borderRadius: 10, marginBottom: 20}}
            leftIcon={{
              color: 'white',
              name: 'spray',
              type: 'material-community',
              size: 18
            }}
            onPress={() => {
              this.props.navigation.navigate('GraffitiScreen')
            }}
            title='Grafitti' />
        </View>
      )
    } else {
      return (
        <View>
          <Text>Locating..</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.mapContainer}>
        {
          this.renderMap()
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    geoSet: (data) => dispatch(GeoActions.geoSet(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
