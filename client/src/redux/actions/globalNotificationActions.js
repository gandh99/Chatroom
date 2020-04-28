import { globalNotification } from '../actionTypes'

export const showSnackbarAction = (message, severity) => dispatch => {
    dispatch({
        type: globalNotification.SHOW_SNACKBAR,
        payload: {
            message,
            severity
        }
    })
}

export const hideSnackbarAction = () => dispatch => {
    dispatch({
        type: globalNotification.HIDE_SNACKBAR,
    })
}