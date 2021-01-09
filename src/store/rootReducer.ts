import { combineReducers } from 'redux'

import appReducer from '../modules/home/redux/reducer'

const rootReducer = combineReducers({
  app: appReducer
})

export default rootReducer
