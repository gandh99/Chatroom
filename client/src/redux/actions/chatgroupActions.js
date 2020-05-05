import { chatGroup } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'
import { history } from '../../config/history'

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
    history.push('/')
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

export const setChatGroupDataForMessagingAction = (chatGroupData) => dispatch => {
    dispatch({
        type: chatGroup.SET_CHATGROUP_DATA_FOR_MESSAGING,
        payload: chatGroupData
    })
}

export const resetChatGroupDataForMessagingAction = () => dispatch => {
    dispatch({
        type: chatGroup.RESET_CHATGROUP_DATA_FOR_MESSAGING,
    })
    history.push('/')
}