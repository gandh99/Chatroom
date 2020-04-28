import { authentication } from '../actionTypes'
import client from '../../config/feathers'

export const registerUserAction = (username, password) => dispatch => {
    client
        .service('users')
        .create({ username, password })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}