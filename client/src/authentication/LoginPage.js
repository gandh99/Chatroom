import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../redux/actions/authenticationActions'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import Header from './Header'
import Banner from './Banner'
import AuthenticationForm from './AuthenticationForm'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'
import { history } from '../config/history'

export default function LoginPage() {
    const dispatch = useDispatch()
    const onSubmit = (username, password) => dispatch(
        loginUserAction(
            username,
            password,
            () => history.push('/'),
            () => dispatch(showSnackbarAction('Invalid username/password.', 'error'))
        )
    )

    return (
        <>
            <Header />
            <Banner />
            <AuthenticationForm
                buttonText={'Login'}
                submitCredentials={onSubmit}
            />
            <CustomSnackbar />
        </>
    )
}