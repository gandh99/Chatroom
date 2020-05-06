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
    client
        .service('friends')
        .create({ username }, null)
        .then(res => {
            dispatch({
                type: friends.ADD_FRIEND_SUCCESS,
                payload: res
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

export const deleteFriendAction = (friendId, success, error) => dispatch => {
    client
        .service('friends')
        .remove(friendId, null)
        .then(res => {
            dispatch({
                type: friends.DELETE_FRIEND_SUCCESS,
                payload: friendId
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