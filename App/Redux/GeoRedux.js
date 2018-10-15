import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  geoRequest: ['data'],
  geoSuccess: ['payload'],
  geoSet: ['data'],
  geoFailure: null
})

export const GeoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  location: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GeoSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
export const geoSet = (state, { data }) => {
  console.log(data)
  return state.merge({ fetching: true, data, location: data.location })
}

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GEO_SET]: geoSet,
  [Types.GEO_REQUEST]: request,
  [Types.GEO_SUCCESS]: success,
  [Types.GEO_FAILURE]: failure
})
