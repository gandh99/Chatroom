import { friends } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const getFriendsAction = () => dispatch => {
    client
        .service('friends')
        .find({})
        .then(res => {
            dispatch({
                type: friends.GET_FRIENDS_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: friends.GET_FRIENDS_FAIL,
                payload: err.data
            })
        })
}

export const addFriendAction = (username, success, error) => dispatch => {
    let recipient

    client
        .service('users')
        .find({ query: { username } })
        .then(res => {
            if (res.total <= 0) throw new Error('User not found.')
            recipient = res.data[0]
            return client.service('friends').create({ recipient })
        })
        .then(res => {
            dispatch({
                type: friends.ADD_FRIEND_SUCCESS,
                payload: recipient
            })
            success()
        })
        .catch(err => {
            dispatch(returnErrors(err.message))
            dispatch({
                type: friends.ADD_FRIEND_FAIL
            })
            error(err.message)
        })
}

export const deleteFriendAction = (recipientId, success, error) => dispatch => {
    client
        .service('friends')
        .remove(recipientId, null)
        .then(res => {
            dispatch({
                type: friends.DELETE_FRIEND_SUCCESS,
                payload: recipientId
            })
            success()
        })
        .catch(err => {
            dispatch(returnErrors(err.message))
            dispatch({
                type: friends.DELETE_FRIEND_FAIL
            })
            error(err.message)
        })
}