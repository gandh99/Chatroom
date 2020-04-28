import { authentication } from '../actionTypes'
import client from '../../config/feathers'
import { returnErrors } from './errorActions'
import { history } from '../../config/history'

export const registerUserAction = (username, password, success, error) => dispatch => {
    client
        .service('users')
        .create({ username, password })
        .then(res => {
            dispatch({
                type: authentication.REGISTER_SUCCESS,
                payload: res.data
            })
            success()
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: authentication.REGISTER_FAIL,
                payload: err.data
            })
            error()
        })
}

export const loginUserAction = (username, password, error) => dispatch => {
    client
        .authenticate({
            strategy: 'local',
            username,
            password
        })
        .then(res => {
            dispatch({
                type: authentication.LOGIN_SUCCESS,
                payload: {
                    accessToken: res.accessToken,
                    userData: {
                        username: res.user.username
                    }
                }
            })
            history.push('/')
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: authentication.LOGIN_FAIL,
                payload: err.data
            })
            error()
        })
}