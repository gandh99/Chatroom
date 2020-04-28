import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { hideSnackbarAction } from '../redux/actions/globalNotificationActions'

export default function CustomSnackbar() {
    const dispatch = useDispatch()
    const show = useSelector(state => state.globalNotification.snackbar.show)
    const message = useSelector(state => state.globalNotification.snackbar.message)
    const severity = useSelector(state => state.globalNotification.snackbar.severity)

    return (
        <Snackbar
            open={show}
            autoHideDuration={5000}
            onClose={() => dispatch(hideSnackbarAction())}>
            <Alert severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}