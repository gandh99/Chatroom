import React, { useState } from 'react'
import './authentication.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../redux/actions/authenticationActions'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import Header from './Header'
import Banner from './Banner'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'
import { usernameIsValid } from '../utils/usernameValidator'
import { passwordIsValid } from '../utils/passwordValidator'

export default function Login() {
    const classes = useStyles()
    const dispatch = useDispatch()

    // Variables to handle input
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const onSubmit = event => {
        event.preventDefault()

        if (hasErrors()) {
            return
        }

        dispatch(
            loginUserAction(
                username,
                password,
                () => dispatch(showSnackbarAction('Invalid username/password.', 'error')),
            )
        )

        clearFormData()
    }

    const hasErrors = () => {
        let hasErrors = false

        if (!usernameIsValid(username)) {
            setUsernameError(true)
            hasErrors = true
        }
        if (!passwordIsValid(password)) {
            setPasswordError(true)
            hasErrors = true
        }

        return hasErrors
    }

    const clearFormData = () => {
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <Header />
            <Banner />
            <div className='login-container'>
                <form onSubmit={onSubmit}>
                    <div className='input-container'>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            className={classes.textField}
                            id='username'
                            required
                            value={username}
                            error={usernameError}
                            label="Username" />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.textField}
                            id='password'
                            required
                            value={password}
                            error={passwordError}
                            label="Password"
                            type='password' />
                        <Button
                            type='submit'
                            style={{ marginTop: '2rem' }}
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disableElevation >
                            Login
                    </Button>
                    </div>
                </form>
                <CustomSnackbar />
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: '1rem'
    },
    button: {
        maginTop: '2rem'
    }
}))