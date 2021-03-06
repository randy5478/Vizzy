import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import data from './data'
import graph from './graph'
import {roomReducer} from './room'

const reducer = combineReducers({
  user,
  data,
  graph,
  room: roomReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
let store
if (process.env.NODE_ENV === 'development') {
  store = createStore(reducer, middleware)
} else {
  store = createStore(reducer, applyMiddleware(thunkMiddleware))
}

export default store
export * from './user'
