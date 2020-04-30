import { friends } from '../actionTypes'

const initialState = {
    allFriends: [],
    addedFriend: {},
    deletedFriend: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case friends.GET_FRIENDS_SUCCESS:
            return {
                ...state,
                allFriends: action.payload
            }
        case friends.GET_FRIENDS_FAIL:
            return {
                ...state,
                allFriends: []
            }
        case friends.ADD_FRIEND_SUCCESS:
            return {
                ...state,
                addedFriend: action.payload,
                allFriends: [...state.allFriends, action.payload]
            }
        case friends.ADD_FRIEND_FAIL:
            return {
                ...state,
                addedFriend: {}
            }
        case friends.DELETE_FRIEND_SUCCESS:
            return {
                ...state,
                allFriends: state.allFriends.filter(friend => friend._id !== action.payload),
                deletedFriend: action.payload
            }
        case friends.DELETE_FRIEND_FAIL:
            return {
                ...state,
                deletedFriend: {}
            }
        default:
            return state
    }
}