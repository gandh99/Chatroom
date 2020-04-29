import { friends } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const getFriendsAction = () => dispatch => {
    client
        .service('users')
        .find({})
        .then(res => console.log(res))
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: friends.GET_FRIENDS_FAIL,
                payload: err.data
            })
        })
}