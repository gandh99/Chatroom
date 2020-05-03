import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextareaAutosize from 'react-autosize-textarea'
import SendIcon from '@material-ui/icons/Send'

export default function TypingBar() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TextareaAutosize
                className={classes.messageArea}
                placeholder='Type a Message'
                rows='1'
                maxLength='200'
            />
            <SendIcon
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
    }
}))