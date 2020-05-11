import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

export default function ChatBubbleOther(props) {
    const classes = useStyles()
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)
    const [shouldDisplayUsername, setShouldDisplayUsername] = useState(false)

    useEffect(() => {
        if (!currentChatGroup.isPrivate && props.senderChanged) setShouldDisplayUsername(true)
    }, [currentChatGroup])

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.sender}>
                    {shouldDisplayUsername && props.message.sender.username}
                </div>
                <div className={classes.messageText}>{props.message.text}</div>
            </div>
            {props.senderChanged && <div className={classes.tail} />}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    container: {
        backgroundColor: theme.palette.grey[200],
        color: 'black',
        borderRadius: '5px',
        fontSize: 12,
        textAlign: 'left',
        marginTop: '0.3rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        padding: '0.5rem',
        maxWidth: '70%',
        borderRadius: '5px',
        fontSize: 12,
        textAlign: 'left',
        marginTop: '0.3rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        padding: '0.5rem',
        maxWidth: '70%',
        wordWrap: 'break-word'
    },
    sender: {
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    },
    tail: {
        backgroundColor: theme.palette.grey[200],
        width: '0.5rem',
        height: '0.5rem',
        borderBottomLeftRadius: '90%',
        position: 'absolute',
        left: '5px',
        top: '5px'
    }
}))