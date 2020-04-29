import { authentication } from '../actionTypes'

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    userData: JSON.parse(localStorage.getItem('userData'))
}

export default function (state = initialState, action) {
    switch (action.type) {
        case authentication.LOGIN_SUCCESS:
            const { accessToken, userData } = action.payload
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('userData', JSON.stringify(userData))

            return {
                ...state,
                accessToken,
                userData: userData,
                isAuthenticated: true,
            }
        case authentication.REAUTHENTICATE_SUCCESS:
        case authentication.REGISTER_SUCCESS:
            return {
                ...state,
            }
        case authentication.LOGIN_FAIL:
        case authentication.LOGOUT_SUCCESS:
        case authentication.REGISTER_FAIL:
        case authentication.REAUTHENTICATE_FAIL:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')

            return {
                ...state,
                accessToken: null,
                userData: null,
                isAuthenticated: false,
            }
        default:
            return state
    }
}