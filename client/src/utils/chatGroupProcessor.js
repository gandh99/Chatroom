import { useSelector } from "react-redux"

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

export const getPrivateChatGroup = (self, selectedFriends, allChatGroups) => {
    if (selectedFriends.length > 1) return null
    let friend = selectedFriends[0]

    for (let i = 0; i < allChatGroups.length; i++) {
        let chatGroup = allChatGroups[i]

        if (!isPrivate(chatGroup)) return null
        
        if ((belongsToGroup(chatGroup.admins, self) && belongsToGroup(chatGroup.members, friend)) ||
            (belongsToGroup(chatGroup.admins, friend) && belongsToGroup(chatGroup.members, self)))
            return chatGroup
    }
    return null
}

// A ChatGroup is private iff there is exactly 1 admin and 1 member
export const isPrivate = (chatGroup) => {
    return (chatGroup.admins.length == 1 && chatGroup.members.length == 1)
}

// A user group refers to admins, members, etc.
export const belongsToGroup = (usersInGroup, user) => {
    for (let i = 0; i < usersInGroup.length; i++) {
        if (usersInGroup[i]._id === user._id) return true
    }
    return false
}