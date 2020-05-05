import { useSelector } from "react-redux"
import { useEffect } from "react"

export const generateChatGroupTitle = (ownUser, participants) => {
    let title = ''

    participants.forEach((participant, index) => {
        if (ownUser.username !== participant.username) {
            if (title !== '') {
                title += ', '
            }
            title += participant.username
        }
    })

    return title
}

export const getLastMessage = (lastMessage) => {
    const lastMessageMaxLength = 30
    if (lastMessage.length >= lastMessageMaxLength) {
        lastMessage = lastMessage.substring(0, lastMessageMaxLength)
        lastMessage += '...'
    }

    return lastMessage
}

export const useChatGroupExists = () => {
    // Basically checks if currentChatGroup from the store === {}
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)
    return Object.keys(currentChatGroup).length !== 0
}