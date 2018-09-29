import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import GraffitiScreen from '../Containers/GraffitiScreen'
import MapScreen from '../Containers/MapScreen'
import RootContainer from '../Containers/RootContainer'
import Tabs from '../Auth/Tabs'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export const PrimaryNav = createStackNavigator({
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

export default createSwitchNavigator(
  {
    AuthLoading: RootContainer,
    App: PrimaryNav,
    Auth: Tabs
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
