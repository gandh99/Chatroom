import React from 'react'
import ChatBubbleSelf from "../../messaging/ChatBubbleSelf"
import ChatBubbleOther from "../../messaging/ChatBubbleOther"

export const messageSentBySelf = (self, message) => {
    return self._id === message.sender
}

export const senderHasChanged = (prevMessage, currMessage) => {
    return !prevMessage || prevMessage.sender !== currMessage.sender
}

export const generateAllChatBubbles = (ownUser, allMessages) => {
    let prevMessage
    return allMessages.map(message => {
        // Determine if this current message has the same sender as that of the previous message
        let senderChanged = senderHasChanged(prevMessage, message)
        prevMessage = message

        // Generate the chat bubble
        return generateSingleChatBubble(ownUser, message, senderChanged)
    })
}

export const generateSingleChatBubble = (self, message, senderChanged) => {
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