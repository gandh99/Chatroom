import { authentication } from '../actionTypes'
import client from '../../config/feathers'

export const registerUserAction = (email, password) => dispatch => {
    client
        .service('users')
        .create({ email, password })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}