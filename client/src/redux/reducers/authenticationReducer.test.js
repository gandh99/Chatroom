import { authentication } from '../actionTypes'
import authenticationReducer from './authenticationReducer'

const testForActionFailOrLogout = (type) => {
    it(`Should reset state for ${type}`, () => {
        const newState = authenticationReducer(undefined, {
            type: type,
            payload: {}
        })
        expect(newState).toEqual({
            accessToken: null,
            isAuthenticated: false,
            userData: null
        })
    })
}

describe('authenticationReducer', () => {
    it('Should return default state', () => {
        const newState = authenticationReducer(undefined, {})
        expect(newState).toEqual({
            accessToken: null,
            isAuthenticated: false,
            userData: null
        })
    })

    it('Should return original state for register success', () => {
        const newState = authenticationReducer(undefined, {
            type: authentication.REGISTER_SUCCESS,
            payload: {}
        })
        expect(newState).toEqual({
            accessToken: null,
            isAuthenticated: false,
            userData: null
        })
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