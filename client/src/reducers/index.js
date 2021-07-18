import {combineReducers} from 'redux'
import userReducer from './userReducer'
import browseReducer from './browseReducer'
import watchReducer from './watchReducer'


const rootReducer = combineReducers({userReducer,browseReducer,watchReducer})

export default rootReducer