import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChatBubbleSelf from './ChatBubbleSelf'
import { useSelector } from 'react-redux'
import ChatBubbleOther from './ChatBubbleOther'

// Checks if the message was sent by myself
const sentBySelf = (self, message) => {
    return self._id === message.sender
}

const generateChatBubble = (self, message, senderChanged) => {
    return sentBySelf(self, message)
        ? <ChatBubbleSelf
            key={message._id}
            message={message}
            senderChanged={senderChanged}
        />
        : <ChatBubbleOther
            key={message._id}
            message={message}
            senderChanged={senderChanged}
        />
}

export default function MessageDisplayArea(props) {
    const classes = useStyles()
    const user = useSelector(state => state.authentication.userData)
    const [chatBubbles, setChatBubbles] = useState([])
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(scrollToBottom, [chatBubbles])

    // For generating the chat bubbles
    useEffect(() => {
        let sender
        props.allMessages.forEach(message => {
            // Determine if this message is by the same sender as the previous message
            let senderChanged = true
            if (sender && sender === message.sender) {
                senderChanged = false
            }
            sender = message.sender

            // Generate the chat bubble
            let chatBubble = generateChatBubble(user, message, senderChanged)

            // We need to use this update function instead of directly setting the new state
            setChatBubbles(prevArray => [...prevArray, chatBubble])
        })

        return () => setChatBubbles([])
    }, [user, props.allMessages])

    return (
        <div className={classes.root}>
            {chatBubbles}
            <div ref={messagesEndRef} />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
}))