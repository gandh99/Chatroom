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

export const loginUserAction = (username, password, success, error) => dispatch => {
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
                        _id: res.user._id,
                        username: res.user.username
                    }
                }
            })
            success()
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

export const reauthenticateAction = () => dispatch => {
    client
        .reAuthenticate()
        .then(res => {
            dispatch({
                type: authentication.REAUTHENTICATE_SUCCESS
            })
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: authentication.REAUTHENTICATE_FAIL,
                payload: err.data
            })
        })
}

export const logoutUserAction = () => dispatch => {
    client
        .logout()
        .then(res => {
            dispatch({
                type: authentication.LOGOUT_SUCCESS
            })
            history.push('/login')
        })
        .catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type: authentication.LOGOUT_FAIL,
                payload: err.data
            })
            history.push('/login')
        })
}