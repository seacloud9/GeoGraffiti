import { StackNavigator } from 'react-navigation'
import GraffitiScreen from '../Containers/GraffitiScreen'
import MapScreen from '../Containers/MapScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MapScreen: { screen: MapScreen },
  GraffitiScreen: { screen: GraffitiScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MapScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
