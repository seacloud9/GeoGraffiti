import AppNavigation from '../Navigation/AppNavigation'

const initialState = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams('AuthLoading'))

export const reducer = (state = initialState, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
