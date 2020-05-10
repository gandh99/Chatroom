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
        case chatGroup.LIVE_UPDATE_CHATGROUP_LAST_MESSAGE:
            const message = action.payload
            let updatedChatGroup

            // Find the chatgroup in the message
            for (const chatGroup of state.allChatGroups) {
                if (chatGroup._id === message.chatgroup) {
                    // We want to copy the object by VALUE, not by reference!!
                    updatedChatGroup = JSON.parse(JSON.stringify(chatGroup))
                    break
                }
            }

            // Update the last message of the chat group
            updatedChatGroup.lastMessage = message

            // In the new state, the updated chat group will be shifted to the front
            return {
                ...state,
                allChatGroups: [updatedChatGroup, ...state.allChatGroups.filter(chatGroup => chatGroup._id !== updatedChatGroup._id)]
            }
        default:
            return state
    }
}