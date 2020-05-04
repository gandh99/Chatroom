import { message } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const getMessagesAction = () => dispatch => {

}

export const sendMessageAction = (text, chatgroup, error) => dispatch => {
    console.log(chatgroup)
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