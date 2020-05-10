import { chatGroup } from '../actionTypes'

const initialState = {
    newChatGroupMembers: [],
    allChatGroups: [],
    currentChatGroup: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case chatGroup.SET_NEW_CHATGROUP_MEMBERS:
            return {
                ...state,
                newChatGroupMembers: action.payload
            }
        case chatGroup.RESET_NEW_CHATGROUP_MEMBERS:
            return {
                ...state,
                newChatGroupMembers: []
            }
        case chatGroup.CREATE_CHATGROUP_SUCCESS:
            return {
                ...state,
                currentChatGroup: action.payload,
            }
        case chatGroup.CREATE_CHATGROUP_FAIL:
            return {
                ...state,
                currentChatGroup: {}
            }
        case chatGroup.GET_CHATGROUPS_SUCCESS:
            return {
                ...state,
                allChatGroups: action.payload
            }
        case chatGroup.GET_CHATGROUPS_FAIL:
            return {
                ...state,
                allChatGroups: []
            }
        case chatGroup.SET_CURRENT_CHATGROUP:
            return {
                ...state,
                currentChatGroup: action.payload
            }
        case chatGroup.RESET_CURRENT_CHATGROUP:
            return {
                ...state,
                currentChatGroup: {}
            }
        case chatGroup.LIVE_CHATGROUP_CREATED:
            return {
                ...state,
                allChatGroups: [...state.allChatGroups, action.payload]
            }
        default:
            return state
    }
}