import { modal } from '../actionTypes'

const initialState = {
    // For adding a friend
    displayAddFriendModal: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case modal.SHOW_ADD_FRIEND_MODAL:
            return {
                ...state,
                displayAddFriendModal: true,
            }
        case modal.HIDE_ADD_FRIEND_MODAL:
            return {
                ...state,
                displayAddFriendModal: false,
            }
        default:
            return state
    }
}