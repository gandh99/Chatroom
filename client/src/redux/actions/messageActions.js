import { message } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const getMessagesAction = () => dispatch => {

}

export const sendMessageAction = (message, chatgroup) => dispatch => {
    client
        .service('message')
}