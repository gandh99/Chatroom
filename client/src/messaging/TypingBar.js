import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { stringLengthIsValid } from '../utils/utils'
import TextareaAutosize from 'react-autosize-textarea'
import SendIcon from '@material-ui/icons/Send'
import { useDispatch } from 'react-redux'
import { sendMessageAction } from '../redux/actions/messageActions'
import { createChatgroupAction } from '../redux/actions/chatgroupActions'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'

const minMessageLength = 1
const maxMessageLength = 200

function inputIsValid(message) {
    return stringLengthIsValid(message, minMessageLength, maxMessageLength)
}

export default function TypingBar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()

        if (!inputIsValid(message)) {
            return
        }

        // TODO: If this is a new chat group, first create a new chat group
        dispatch(createChatgroupAction(
            () => setMessage(''),
            err => dispatch(showSnackbarAction(err)),
        ))
    }

    return (
        <div className={classes.root}>
            <TextareaAutosize
                value={message}
                className={classes.messageArea}
                placeholder='Type a Message'
                rows={1}
                maxLength={maxMessageLength}
                onChange={(e) => { setMessage(e.target.value) }}
            />
            <SendIcon
                onClick={onSubmit}
                className={classes.sendIcon}
            />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: '1rem',
        backgroundColor: theme.palette.primary.main
    },
    messageArea: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        resize: 'none',
        color: theme.palette.primary.contrastText,
        overflowY: 'hidden'
    },
    sendIcon: {
        marginLeft: '1rem',
        marginRight: '0.5rem',
        color: 'white',
        cursor: 'pointer'
    }
}))