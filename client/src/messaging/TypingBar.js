import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { stringLengthIsValid } from '../utils/generalValidator'
import TextareaAutosize from 'react-autosize-textarea'
import SendIcon from '@material-ui/icons/Send'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessageAction } from '../redux/actions/messageActions'
import { createChatGroupAction, resetNewChatGroupMembersAction } from '../redux/actions/chatGroupActions'
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
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)

    // Only needed if we need to create a new chat group before sending the message
    const newChatGroupMembers = useSelector(state => state.chatGroup.newChatGroupMembers)

    // For sending a message to the chat group
    const sendMessage = (message, currentChatGroup) => {
        if (!inputIsValid(message)) return

        dispatch(sendMessageAction(
            message,
            currentChatGroup,
            err => dispatch(showSnackbarAction(err, 'error')),
        ))
        setMessage('')
    }

    // Triggered only when a new chat group is first created before sending the message
    useEffect(() => {
        sendMessage(message, currentChatGroup)        
    }, [currentChatGroup])

    const onSubmit = async event => {
        event.preventDefault()

        if (!inputIsValid(message)) {
            return
        }

        // TODO: If this is a new chat group, first create a new chat group
        // DONE: First verify that newChatGroupParticipants is not empty!!
        if (newChatGroupMembers.length > 0) {
            dispatch(createChatGroupAction(
                newChatGroupMembers,
                () => {
                    dispatch(resetNewChatGroupMembersAction())
                },
                err => dispatch(showSnackbarAction(err, 'error')),
            ))

            return
        }

        // Send the message
        sendMessage(message, currentChatGroup)
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