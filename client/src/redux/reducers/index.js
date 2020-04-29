import { combineReducers } from 'redux'
import authentication from './authenticationReducer'
import error from './errorReducer'
import globalNotification from './globalNotificationReducer'
import modal from './modalReducer'
import friend from './friendsReducer'

export default combineReducers({
    authentication,
    error,
    globalNotification,
    modal,
    friend
})