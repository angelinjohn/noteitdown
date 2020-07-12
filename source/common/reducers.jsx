import {combineReducers} from 'redux'
import notes from '../StickyNotes/reducer'

const rootReducer = combineReducers({notes})

export default rootReducer;