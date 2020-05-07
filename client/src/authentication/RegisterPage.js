import React from 'react'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import Header from './Header'
import Banner from './Banner'
import AuthenticationForm from './AuthenticationForm'
import { useDispatch } from 'react-redux'
import { registerUserAction } from '../redux/actions/authenticationActions'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'

export default function RegisterPage() {
    const dispatch = useDispatch()
    const onSubmit = (username, password) => dispatch(
        registerUserAction(
            username,
            password,
            () => dispatch(showSnackbarAction('Registration successful.', 'success')),
            () => dispatch(showSnackbarAction('Registration unsuccessful.', 'error'))
        )
    )

    return (
        <>
            <Header />
            <Banner />
            <AuthenticationForm
                buttonText={'Register'}
                submitCredentials={onSubmit}
            />
            <CustomSnackbar />
        </>
    )
}