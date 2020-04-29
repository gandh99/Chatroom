import { friends } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const getFriendsAction = () => dispatch => {
    client
        .service('users')
        .find({ query: { test: 'test' } })
        .then(res => {
            console.log(res)
            dispatch({
                type: friends.GET_FRIENDS_SUCCESS,
                payload: res.data
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