import { useSelector } from "react-redux"

export const generateChatGroupTitle = (ownUser, participants) => {
    let title = ''

    participants.forEach((participant, index) => {
        if (ownUser._id !== participant._id) {
            if (title !== '') {
                title += ', '
            }
            title += participant.username
        }
    })
    return title
}

export const shortenMessage = (lastMessage) => {
    const lastMessageMaxLength = 30
    if (lastMessage.length >= lastMessageMaxLength) {
        lastMessage = lastMessage.substring(0, lastMessageMaxLength)
        lastMessage += '...'
    }

    return lastMessage
}

// Basically checks if currentChatGroup from the store === {}
export const useChatGroupExists = () => {
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)
    return Object.keys(currentChatGroup).length !== 0
}

// Attempts to find a private ChatGroup between self and the friend
export const findPrivateChatGroup = (self, friend, allChatGroups) => {
    for (let i = 0; i < allChatGroups.length; i++) {
        let chatGroup = allChatGroups[i]

        if (!isChatGroupPrivate(chatGroup)) return null
        
        if ((hasRank(self, chatGroup.admins) && hasRank(friend, chatGroup.members)) ||
            (hasRank(friend, chatGroup.admins) && hasRank(self, chatGroup.members)))
            return chatGroup
    }
    return null
}

// A ChatGroup is private iff there is exactly 1 admin and 1 member
export const isChatGroupPrivate = (chatGroup) => {
    return (chatGroup.admins.length == 1 && chatGroup.members.length == 1)
}

// A rank refers to admin or member
export const hasRank = (user, usersWithRank) => {
    for (let i = 0; i < usersWithRank.length; i++) {
        if (usersWithRank[i]._id === user._id) return true
    }
    return false
}