import { NavigationActions, StackActions } from 'react-navigation'
import { PrimaryNav } from '../Navigation/AppNavigation'

const { navigate } = NavigationActions
const { getStateForAction } = PrimaryNav.router

const INITIAL_STATE = getStateForAction(
  navigate({ routeName: 'LoadingScreen' })
)
const NOT_LOGGED_IN_STATE = getStateForAction(StackActions.reset({
  index: 0,
  actions: [
    navigate({ routeName: 'NotLoggedInStack' })
  ]
}))
const LOGGED_IN_STATE = getStateForAction(StackActions.reset({
  index: 0,
  actions: [
    navigate({ routeName: 'LoggedInStack' })
  ]
}))
/**
 * Creates an navigation action for dispatching to Redux.
 *
 * @param {string} routeName The name of the route to go to.
 */
// const navigateTo = routeName => () => navigate({ routeName })

export function reducer (state = INITIAL_STATE, action) {
  let nextState

  nextState = getStateForAction(action, state)
  return nextState || state
}
