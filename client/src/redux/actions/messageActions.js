import { message } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

client.service('message').on('created', message => console.log(message))

export const getMessagesAction = (chatgroup) => dispatch => {
    client
        .service('message')
        .find({ query: { chatgroup } })
        .then(res => {
            dispatch({
                type: message.GET_MESSAGES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: message.GET_MESSAGES_FAIL,
            })
        })
}

export const sendMessageAction = (text, chatgroup, error) => dispatch => {
    client
        .service('message')
        .create({ text, chatgroup })
        .then(res => {
            dispatch({
                type: message.SEND_MESSAGE_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: message.SEND_MESSAGE_FAIL,
            })
            error('Unable to send message. Please try again later.')
        })
}

export const clearMessagesAction = () => dispatch => {
    dispatch({
        type: message.CLEAR_MESSAGES
    })
}