import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { isValidCredentials } from '../utils/authentication'
import { useDispatch } from 'react-redux'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'

export default function AuthenticationForm(props) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = event => {
        event.preventDefault()

        if (isValidCredentials(username, password)) {
            props.submitCredentials(username, password)
        } else {
            dispatch(showSnackbarAction('Invalid input.', 'error'))
        }
        
        clearFormData()
    }

    const clearFormData = () => {
        setUsername('')
        setPassword('')
    }

    return (
        <div className={classes.root}>
            <form onSubmit={onSubmit}>
                <div className={classes.inputContainer}>
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        className={classes.textField}
                        required
                        value={username}
                        id="username"
                        label="Username" />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.textField}
                        required
                        value={password}
                        id="password"
                        label="Password"
                        type='password' />
                    <Button
                        type='submit'
                        style={{ marginTop: '2rem' }}
                        className={classes.button}
                        id='submit-button'
                        variant="contained"
                        color="primary"
                        disableElevation >
                        {props.buttonText}
                    </Button>
                </div>
            </form>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.contrastText,
        padding: '1rem 2rem 2rem',
        marginTop: '200px',
        marginLeft: '2rem',
        marginRight: '2rem',
        borderRadius: '10px'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginTop: '1rem'
    },
    button: {
        maginTop: '2rem'
    }
}))