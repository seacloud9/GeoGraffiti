import { createStackNavigator } from 'react-navigation'
import GraffitiScreen from '../Containers/GraffitiScreen'
import MapScreen from '../Containers/MapScreen'
import RootContainer from '../Containers/RootContainer'
import Tabs from '../Auth/Tabs'

import styles from './Styles/NavigationStyles'

export const LoggedInStackNavigator = createStackNavigator({
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

// Manifest of possible screens
export const PrimaryNav = createStackNavigator({
  LoggedInStack: { screen: LoggedInStackNavigator },
  NotLoggedInStack: { screen: Tabs },
  LoadingScreen: { screen: RootContainer }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoadingScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})
