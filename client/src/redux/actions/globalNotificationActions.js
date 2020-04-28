import { globalNotification } from '../actionTypes'

export const showSnackbar = (message, severity) => dispatch => {
    dispatch({
        type: globalNotification.SHOW_SNACKBAR,
        payload: {
            message,
            severity
        }
    })
}

export const hideSnackbar = () => dispatch => {
    dispatch({
        type: globalNotification.HIDE_SNACKBAR,
    })
}