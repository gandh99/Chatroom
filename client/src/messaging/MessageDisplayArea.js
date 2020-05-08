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

export default function MessageDisplayArea({ allMessages }) {
    const classes = useStyles()
    const user = useSelector(state => state.authentication.userData)
    const [chatBubbles, setChatBubbles] = useState([])
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(scrollToBottom, [chatBubbles])

    // Generate the chat bubbles
    useEffect(() => {
        let prevSender
        allMessages.forEach(message => {
            // Determine if this current message has the same sender as that of the previous message
            let senderChanged = true
            if (prevSender && prevSender === message.sender) {
                senderChanged = false
            }
            prevSender = message.sender

            // Generate the chat bubble
            let chatBubble = generateChatBubble(user, message, senderChanged)

            // We need to use this update function instead of directly setting the new state
            setChatBubbles(prevArray => [...prevArray, chatBubble])
        })

        return () => setChatBubbles([])
    }, [user, allMessages])

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