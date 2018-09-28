import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import { Location } from 'expo-location'
import { Permissions } from 'expo-permissions'
// Styles
import styles from './Styles/MapScreenStyle'

class MapScreen extends Component {
  state = {
    location: null,
    errorMessage: null
  }

  async componentDidMount () {
    try {
      const status = await Permissions.askAsync(Permissions.LOCATION)
      console.log('status', status)
      if (status.status !== 'granted') {
        throw new Error('No permission!')
      }

      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      console.log('result', location)
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
        this.setState({ location })
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  renderMap () {
    if (this.state.location) {
      console.log(this.state.location)
      return (
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          />
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
      <View style={styles.container}>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
