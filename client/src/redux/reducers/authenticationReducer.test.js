import { authentication } from '../actionTypes'
import authenticationReducer from './authenticationReducer'

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    userData: null
}

const testForActionFailOrLogout = (type) => {
    it(`Should reset state for ${type}`, () => {
        const newState = authenticationReducer(undefined, {
            type: type,
            payload: {}
        })
        expect(newState).toEqual(initialState)
    })
}

describe('authenticationReducer', () => {
    it('Should return default state', () => {
        const newState = authenticationReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should return original state for register success', () => {
        const newState = authenticationReducer(undefined, {
            type: authentication.REGISTER_SUCCESS,
            payload: {}
        })
        expect(newState).toEqual(initialState)
    })

    it('Should return login data for login success', () => {
        const newState = authenticationReducer(undefined, {
            type: authentication.LOGIN_SUCCESS,
            payload: {
                accessToken: 'accessToken',
                userData: {
                    username: 'username'
                }
            }
        })
        expect(newState).toEqual({
            accessToken: 'accessToken',
            isAuthenticated: true,
            userData: {
                username: 'username'
            }
        })
    })

    testForActionFailOrLogout(authentication.REGISTER_FAIL)

    testForActionFailOrLogout(authentication.LOGIN_FAIL)

    testForActionFailOrLogout(authentication.LOGOUT_SUCCESS)
})