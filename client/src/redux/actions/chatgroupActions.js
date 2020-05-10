import { chatGroup } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const setNewChatGroupMembersAction = (membersArray) => dispatch => {
    // The array does not include the creator because his data 
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

export const setCurrentChatGroupAction = (currentChatGroup) => dispatch => {
    dispatch({
        type: chatGroup.SET_CURRENT_CHATGROUP,
        payload: currentChatGroup
    })
}

export const resetCurrentChatGroupAction = () => dispatch => {
    dispatch({
        type: chatGroup.RESET_CURRENT_CHATGROUP,
    })
}

export const getChatGroupsAction = () => dispatch => {
    client
        .service('chatgroup')
        .find({})
        .then(res => {
            dispatch({
                type: chatGroup.GET_CHATGROUPS_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: chatGroup.GET_CHATGROUPS_FAIL,
                payload: err.data
            })
        })
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
            error('Unable to create chat group. Please try again later.')
        })
}

export const liveChatGroupCreatedAction = newChatGroup => dispatch => {
    dispatch({
        type: chatGroup.LIVE_CHATGROUP_CREATED,
        payload: newChatGroup
    })
}

export const liveUpdateChatGroupLastMessageAction = message => dispatch => {
    dispatch({
        type: chatGroup.LIVE_UPDATE_CHATGROUP_LAST_MESSAGE,
        payload: message
    })
}