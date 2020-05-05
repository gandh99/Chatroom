import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MessageCardSelf from './MessageCardSelf'

export default function MessageDisplayArea(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {props.allMessages.map(message => (
                <MessageCardSelf
                    key={message._id}
                    message={message}
                />
            ))}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
}))