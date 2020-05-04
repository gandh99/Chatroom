import { chatGroup } from '../actionTypes'

const initialState = {
    newChatGroupMembers: JSON.parse(localStorage.getItem('newChatGroupMembers')) || [],
    allChatGroups: [],
    currentChatGroup: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case chatGroup.SET_NEW_CHATGROUP_MEMBERS:
            // Save in localStorage so that it persists even after refresh
            const newChatGroupMembers = action.payload
            localStorage.setItem('newChatGroupMembers', JSON.stringify(newChatGroupMembers))

            return {
                ...state,
                newChatGroupMembers
            }
        case chatGroup.RESET_NEW_CHATGROUP_MEMBERS:
            localStorage.removeItem('newChatgroupMembers')

            return {
                ...state,
                newChatGroupMembers: []
            }
        case chatGroup.CREATE_CHATGROUP_SUCCESS:
            return {
                ...state,
                currentChatGroup: action.payload,
                allChatGroups: [...state.allChatGroups, action.payload],
                newChatGroupMembers: []
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
        default:
            return state
    }
}