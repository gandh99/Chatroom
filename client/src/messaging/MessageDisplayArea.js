import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { generateAllChatBubbles } from '../utils/message/index'

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
        setChatBubbles(generateAllChatBubbles(ownUser, allMessages))

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