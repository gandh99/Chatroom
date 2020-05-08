import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChatBubbleSelf from './ChatBubbleSelf'
import { useSelector } from 'react-redux'
import ChatBubbleOther from './ChatBubbleOther'

const messageSentBySelf = (self, message) => {
    return self._id === message.sender
}

const senderHasChanged = (prevMessage, currMessage) => {
    return !prevMessage || prevMessage.sender !== currMessage.sender
}

const generateAllChatBubbles = (ownUser, allMessages) => {
    let prevMessage
    return allMessages.map(message => {
        // Determine if this current message has the same sender as that of the previous message
        let senderChanged = senderHasChanged(prevMessage, message)
        prevMessage = message

        // Generate the chat bubble
        return generateChatBubble(ownUser, message, senderChanged)
    })
}

const generateChatBubble = (self, message, senderChanged) => {
    return messageSentBySelf(self, message)
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
    const ownUser = useSelector(state => state.authentication.userData)
    const [chatBubbles, setChatBubbles] = useState([])
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(scrollToBottom, [chatBubbles])

    // Generate the chat bubbles
    useEffect(() => {
        let allChatBubbles = generateAllChatBubbles(ownUser, allMessages)
        setChatBubbles(allChatBubbles)

        return () => setChatBubbles([])
    }, [ownUser, allMessages])

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