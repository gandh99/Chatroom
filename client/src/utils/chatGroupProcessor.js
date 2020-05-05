export const generateChatGroupTitle = (ownUser, participants) => {
    let title = ''

    participants.forEach((participant, index) => {
        if (ownUser.username !== participant.username) {
            title += participant.username

            if (participants[index + 1]) {
                title += ', '
            }
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