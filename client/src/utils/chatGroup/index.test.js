import {
    generateChatGroupTitle,
    shortenMessage,
    hasRank,
    isChatGroupPrivate,
    findPrivateChatGroup
} from './index'

describe('ChatGroup utils', () => {
    describe('generateChatGroupTitle()', () => {
        it('Generates a chat group title based on the username of the other person', () => {
            const ownUser = {
                _id: 100,
                username: 'myself'
            }
            const participants = [
                ownUser,
                { _id: 1, username: 'friend1' }
            ]
            const chatGroupTitle = generateChatGroupTitle(ownUser, participants)
            expect(chatGroupTitle).toBe('friend1')
        })

        it('Generates a chat group title based on the usernames of all the participants except myself', () => {
            const ownUser = {
                _id: 100,
                username: 'myself'
            }

            const dummyFriendUsernamePrefix = 'friend'
            const participants = [
                { _id: 1, username: dummyFriendUsernamePrefix + 1 },
                { _id: 2, username: dummyFriendUsernamePrefix + 2 },
                { _id: 3, username: dummyFriendUsernamePrefix + 3 },
                { _id: 4, username: dummyFriendUsernamePrefix + 4 },
                ownUser
            ]
            const chatGroupTitle = generateChatGroupTitle(ownUser, participants)
            expect(chatGroupTitle).toBe('friend1, friend2, friend3, friend4')
        })
    })

    describe('shortenMessage()', () => {
        it('Does not shorten a message that is empty', () => {
            const message = ''
            const shortenedMessage = shortenMessage(message)
            expect(shortenedMessage).toBe(message)
        })

        it('Does not shorten a message that is lesser or equal to 30 characters', () => {
            const message = 'Hello!'
            const shortenedMessage = shortenMessage(message)
            expect(shortenedMessage).toBe(message)
        })

        it('Shortens a message that is greater than 30 characters', () => {
            const message = 'This is a very long message with exactly 55 characters.'
            const shortenedMessage = shortenMessage(message)
            expect(shortenedMessage).toBe('This is a very long message wi...')
        })
    })

    describe('findPrivateChatGroup()', () => {
        const ownUser = { _id: 1, username: "myself" }
        const friend = { _id: 2, username: "friend" }

        it('Should return null if allChatGroups is empty', () => {
            const allChatGroups = []
            expect(findPrivateChatGroup(ownUser, friend, allChatGroups)).toBeFalsy()
        })

        it('Should return null if there is no existing chat group between ownUser and friend', () => {
            const allChatGroups = [
                {
                    _id: 100,
                    admins: [{ _id: 200, username: 'admin1' }, ownUser],
                    members: [friend],
                }
            ]
            expect(findPrivateChatGroup(ownUser, friend, allChatGroups)).toBeFalsy()
        })

        it('Should return the chat group if there is an existing chat group between ownUser and friend', () => {
            const chatGroup = {
                _id: 100,
                admins: [ownUser],
                members: [friend],
            }
            const allChatGroups = [
                chatGroup
            ]
            expect(findPrivateChatGroup(ownUser, friend, allChatGroups)).toBe(chatGroup)
        })
    })

    describe('isChatGroupPrivate()', () => {
        it('Should return false if chat group has more than 1 admin', () => {
            const chatGroup = {
                _id: 100,
                admins: [{ _id: 200, username: 'admin1' }, { _id: 201, username: 'admin2' }],
                members: [{ _id: 300, username: 'member1' }],
            }
            expect(isChatGroupPrivate(chatGroup)).toBeFalsy()
        })

        it('Should return false if chat group has more than 1 member', () => {
            const chatGroup = {
                _id: 100,
                admins: [{ _id: 300, username: 'admin' }],
                members: [{ _id: 200, username: 'member1' }, { _id: 201, username: 'member2' }],
            }
            expect(isChatGroupPrivate(chatGroup)).toBeFalsy()
        })

        it('Should return false if chat group has more than 1 admin and more than 1 member', () => {
            const chatGroup = {
                _id: 100,
                admins: [{ _id: 300, username: 'admin1' }, { _id: 301, username: 'admin2' }],
                members: [{ _id: 200, username: 'member1' }, { _id: 201, username: 'member2' }],
            }
            expect(isChatGroupPrivate(chatGroup)).toBeFalsy()
        })

        it('Should return true if chat group has exactly 1 admin and 1 member', () => {
            const chatGroup = {
                _id: 100,
                admins: [{ _id: 300, username: 'admin1' }],
                members: [{ _id: 200, username: 'member1' }],
            }
            expect(isChatGroupPrivate(chatGroup)).toBeTruthy()
        })
    })

    describe('hasRank()', () => {
        const ownUser = { _id: 1, username: "myself" }

        it('Should return true if ownUser is part of the users with a particular rank', () => {
            const usersWithRank = [
                { _id: 2, username: 'friend2' },
                ownUser,
                { _id: 3, username: 'friend3' },
            ]
            expect(hasRank(ownUser, usersWithRank)).toBeTruthy()
        })

        it('Should return false if ownUser is not part of the users with a particular rank', () => {
            const usersWithRank = [
                { _id: 2, username: 'friend2' },
                { _id: 3, username: 'friend3' },
            ]
            expect(hasRank(ownUser, usersWithRank)).toBeFalsy()
        })

        it('Should return false if the array of users with a particular rank is empty', () => {
            const usersWithRank = []
            expect(hasRank(ownUser, usersWithRank)).toBeFalsy()
        })
    })
})