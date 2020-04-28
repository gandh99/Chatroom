import { authentication } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'

export const registerUserAction = (username, password) => dispatch => {
    client
        .service('users')
        .create({ username, password })
        .then(res => {
            dispatch({
                type: authentication.REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: authentication.REGISTER_FAIL,
                payload: err.data
            })
        })
}