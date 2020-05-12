import { message } from '../actionTypes'
import messageReducer from './messageReducer'

const initialState = {
    allMessages: [],
    sentMessage: {}
}

describe('messageReducer', () => {
    it('Should return default state', () => {
        const newState = messageReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should return array of messages for get messages success', () => {
        const allMessages = [
            { _id: 1, text: 'message1' },
            { _id: 2, text: 'message2' },
            { _id: 3, text: 'message3' },
        ]
        const newState = messageReducer(undefined, {
            type: message.GET_MESSAGES_SUCCESS,
            payload: allMessages
        })
        expect(newState).toEqual({
            ...initialState,
            allMessages
        })
    })

    it('Should return empty array for allMessages for get messages fail', () => {
        const newState = messageReducer(undefined, {
            type: message.GET_MESSAGES_FAIL,
        })
        expect(newState).toEqual({
            ...initialState,
            allMessages: []
        })
    })

    it('Should return sent message for send message success', () => {
        const sentMessage = { _id: 1, text: 'message1' }
        const newState = messageReducer(undefined, {
            type: message.SEND_MESSAGE_SUCCESS,
            payload: sentMessage
        })
        expect(newState).toEqual({
            ...initialState,
            sentMessage,
        })
    })

    it('Should return empty sent message for send message fail', () => {
        const newState = messageReducer(undefined, {
            type: message.SEND_MESSAGE_FAIL,
            payload: message
        })
        expect(newState).toEqual({
            ...initialState,
            sentMessage: {}
        })
    })

    it('Should return empty sent message and empty allMesages for clear messages', () => {
        const newState = messageReducer(undefined, {
            type: message.CLEAR_MESSAGES,
        })
        expect(newState).toEqual({
            ...initialState,
            sentMessage: {},
            allMessages: []
        })
    })
})