import { message } from '../actionTypes'

const initialState = {
    allMessages: [],
    sentMessage: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case message.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                allMessages: action.payload
            }
        case message.GET_MESSAGES_FAIL:
            return {
                ...state,
                allMessages: []
            }
        case message.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sentMessage: action.payload,
                allMessages: [...state.allMessages, action.payload]
            }
        case message.SEND_MESSAGE_FAIL:
            return {
                ...state,
                sentMessage: {}
            }
        default:
            return state
    }
}