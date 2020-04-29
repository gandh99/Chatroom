import { friends } from '../actionTypes'

const initialState = {
    friends: [],
    addedFriend: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case friends.GET_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload
            }
        case friends.ADD_FRIENDS_SUCCESS:
            return {
                ...state,
                addedFriend: action.payload
            }
        case friends.ADD_FRIENDS_FAIL:
            return {
                ...state,
                addedFriend: {}
            }
        case friends.GET_FRIENDS_FAIL:
            return {
                ...state,
                friends: []
            }
        default:
            return state
    }
}