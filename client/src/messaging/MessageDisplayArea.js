import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChatBubbleSelf from './ChatBubbleSelf'
import { useSelector } from 'react-redux'
import ChatBubbleOther from './ChatBubbleOther'

// Checks if the message was sent by myself
const sentBySelf = (self, message) => {
    return self._id === message.sender
}

export default function MessageDisplayArea(props) {
    const classes = useStyles()
    const user = useSelector(state => state.authentication.userData)
    const [chatBubbles, setChatBubbles] = useState([])

    // For generating the chat bubbles
    useEffect(() => {
        props.allMessages.forEach(message => {
            let nextChatBubble = sentBySelf(user, message)
                ? <ChatBubbleSelf
                    key={message._id}
                    message={message}
                />
                : <ChatBubbleOther
                    key={message._id}
                    message={message}
                />

            // We need to use this update function instead of directly setting the new state
            setChatBubbles(prevArray => [...prevArray, nextChatBubble])
        })

        return () => setChatBubbles([])
    }, [user, props.allMessages])

    return (
        <div className={classes.root}>
            {chatBubbles}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
}))