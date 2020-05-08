import React from 'react'
import { shallow } from 'enzyme'
import {
    messageSentBySelf, senderHasChanged, generateAllChatBubbles, generateSingleChatBubble
} from './index'
import ChatBubbleSelf from '../../messaging/ChatBubbleSelf'

describe('Message utils', () => {
    describe('messageSentBySelf()', () => {
        it('Returns false if message was not sent by self', () => {
            const ownUser = { _id: 100, username: 'myself' }
            const friend = { _id: 200, username: 'friend' }
            const message = { _id: 1, sender: 200 }
            expect(messageSentBySelf(ownUser, message)).toBeFalsy()
        })

        it('Returns true if message was sent by self', () => {
            const ownUser = { _id: 100, username: 'myself' }
            const friend = { _id: 200, username: 'friend' }
            const message = { _id: 1, sender: 100 }
            expect(messageSentBySelf(ownUser, message)).toBeTruthy()
        })
    })

    describe('senderHasChanged()', () => {
        it('Returns true if sender of previous message is same as sender of current message', () => {
            const prevMessage = { _id: 1, sender: 200 }
            const currMessage = { _id: 2, sender: 300 }
            expect(senderHasChanged(prevMessage, currMessage)).toBeTruthy()
        })

        it('Returns false if sender of previous message is different from sender of current message', () => {
            const prevMessage = { _id: 1, sender: 200 }
            const currMessage = { _id: 2, sender: 200 }
            expect(senderHasChanged(prevMessage, currMessage)).toBeFalsy()
        })
    })

    describe('generateAllChatBubbles()', () => {
        it('Returns empty array if no messages were supplied', () => {
            const ownUser = { _id: 100, username: 'myself' }
            const allMessages = []
            const allChatBubbles = generateAllChatBubbles(ownUser, allMessages)
            expect(allChatBubbles.length).toBe(0)
        })

        it('Returns array with length equal to the number of messages supplied', () => {
            const ownUser = { _id: 100, username: 'myself' }
            const allMessages = [
                { _id: 1, sender: 100 },
                { _id: 2, sender: 200 },
                { _id: 3, sender: 300 },
                { _id: 4, sender: 400 },
            ]
            const allChatBubbles = generateAllChatBubbles(ownUser, allMessages)
            expect(allChatBubbles.length).toBe(allMessages.length)
        })
    })

    describe('generateSingleChatBubble()', () => {
    })
})