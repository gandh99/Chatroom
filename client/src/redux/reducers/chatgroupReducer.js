import { chatgroup } from '../actionTypes'

const initialState = {
    newChatGroupMembers: JSON.parse(localStorage.getItem('newChatgroupMembers')),
    allChatGroups: [],
    newChatGroup: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case chatgroup.SET_NEW_CHATGROUP_MEMBERS:
            // Save in localStorage so that it persists even after refresh
            const newChatGroupMembers = action.payload
            localStorage.setItem('newChatgroupMembers', JSON.stringify(newChatGroupMembers))

            return {
                ...state,
                newChatGroupMembers
            }
        case chatgroup.RESET_NEW_CHATGROUP_MEMBERS:
            localStorage.removeItem('newChatgroupMembers')

            return {
                ...state,
                newChatGroupMembers: []
            }
        case chatgroup.CREATE_CHATGROUP_SUCCESS:
            return {
                ...state,
                newChatGroup: action.payload,
                allChatGroups: [...state.allChatGroups, action.payload],
                newChatGroupMembers: []
            }
        case chatgroup.CREATE_CHATGROUP_FAIL:
            return {
                ...state,
                newChatGroup: {}
            }
        case chatgroup.GET_CHATGROUPS_SUCCESS:
            return {
                ...state,
                allChatGroups: action.payload
            }
        case chatgroup.GET_CHATGROUPS_FAIL:
            return {
                ...state,
                allChatGroups: []
            }
        default:
            return state
    }
}