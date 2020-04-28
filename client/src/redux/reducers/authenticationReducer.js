import {
    authentication
} from '../actionTypes'

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    userData: JSON.parse(localStorage.getItem('userData'))
}

export default function (state = initialState, action) {
    switch (action.type) {
        case authentication.LOGIN_SUCCESS:
            const { accessToken, userData } = action.payload.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('userData', JSON.stringify(userData))

            return {
                ...state,
                accessToken,
                userData: userData,
                isAuthenticated: true,
                isLoading: false
            }
        case authentication.REGISTER_SUCCESS:
            return {
                ...state,
            }
        case authentication.LOGIN_FAIL:
        case authentication.LOGOUT_SUCCESS:
        case authentication.REGISTER_FAIL:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')

            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                userData: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}