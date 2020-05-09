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
            }
        case message.SEND_MESSAGE_FAIL:
            return {
                ...state,
                sentMessage: {}
            }
        case message.CLEAR_MESSAGES:
            return {
                ...state,
                allMessages: [],
                sentMessage: {}
            }
        case message.LIVE_MESSAGE_UPDATE:
            return {
                ...state,
                allMessages: [...state.allMessages, action.payload]
            }
        default:
            return state
    }
}