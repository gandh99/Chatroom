import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChatBubbleSelf from './ChatBubbleSelf'
import { useSelector } from 'react-redux'

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
            let nextChatBubble
            
            if (sentBySelf(user, message)) {
                nextChatBubble =
                    <ChatBubbleSelf
                        key={message._id}
                        message={message}
                    />
            } else {
            }

            setChatBubbles(prevArray => [...prevArray, nextChatBubble])
        })
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