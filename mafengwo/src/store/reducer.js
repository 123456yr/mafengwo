import { combineReducers} from 'redux'
import banner from './banner'
import hotmdd from './hotmdd'
import mine from './mine'

const reducer=combineReducers({ banner, hotmdd, mine})

export default reducer
