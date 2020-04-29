import { modal } from '../actionTypes'
import { returnErrors } from './errorActions'

export const showAddFriendModalAction = () => dispatch => {
    dispatch({
        type: modal.SHOW_ADD_FRIEND_MODAL,
    })
}

export const hideAddFriendModalAction = () => dispatch => {
    dispatch({
        type: modal.HIDE_ADD_FRIEND_MODAL,
    })
}