import { chatGroup } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const setNewChatGroupMembersAction = (membersArray) => dispatch => {
    // participantsArray does not include the creator because his data 
    // would be automatically sent along during the createGroupAction() phase.
    dispatch({
        type: chatGroup.SET_NEW_CHATGROUP_MEMBERS,
        payload: membersArray,
    })
}

export const resetNewChatGroupMembersAction = () => dispatch => {
    dispatch({
        type: chatGroup.RESET_NEW_CHATGROUP_MEMBERS
    })
}

export const getChatGroupsAction = () => dispatch => {

}

export const createChatGroupAction = (members, success, error) => dispatch => {
    client
        .service('chatgroup')
        .create({ members })
        .then(res => {
            dispatch({
                type: chatGroup.CREATE_CHATGROUP_SUCCESS,
                payload: res
            })
            success()
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: chatGroup.CREATE_CHATGROUP_FAIL,
                payload: err.data
            })
            error('Unable to send message. Please try again later.')
        })
}