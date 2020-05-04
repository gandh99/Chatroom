import { chatgroup } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const setNewChatgroupMembersAction = (membersArray) => dispatch => {
    // participantsArray does not include the creator because his data 
    // would be automatically sent along during the createGroupAction() phase.
    dispatch({
        type: chatgroup.SET_NEW_CHATGROUP_MEMBERS,
        payload: membersArray,
    })
}

export const resetNewChatgroupMembersAction = () => dispatch => {
    dispatch({
        type: chatgroup.RESET_NEW_CHATGROUP_MEMBERS
    })
}

export const getChatgroupsAction = () => dispatch => {

}

export const createChatgroupAction = (members, success, error) => dispatch => {
    client
        .service('chatgroup')
        .create({ members })
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