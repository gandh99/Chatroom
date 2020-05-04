import { chatgroup } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const getChatgroupsAction = () => dispatch => {

}

export const createChatgroupAction = (success, error) => dispatch => {
    client
        .service('chatgroup')
        .create({})
        .then(res => {
            dispatch({
                type: chatgroup.CREATE_CHATGROUP_SUCCESS,
                payload: res
            })
            success()
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: chatgroup.CREATE_CHATGROUP_FAIL,
                payload: err.data
            })
            error('Unable to send message. Please try again later.')
        })
}