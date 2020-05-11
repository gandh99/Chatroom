import React from 'react'
import { shallow } from 'enzyme'
import {
    messageSentBySelf, senderHasChanged, generateAllChatBubbles, generateSingleChatBubble, messageIsValid
} from './index'
import ChatBubbleSelf from '../../messaging/ChatBubbleSelf'

describe('Message utils', () => {
    describe('messageSentBySelf()', () => {
        it('Returns false if message was not sent by self', () => {
            const ownUser = { _id: 100, username: 'myself' }
            const friend = { _id: 200, username: 'friend' }
            const message = { _id: 1, sender: friend }
            expect(messageSentBySelf(ownUser, message)).toBeFalsy()
        })

        it('Returns true if message was sent by self', () => {
            const ownUser = { _id: 100, username: 'myself' }
            const friend = { _id: 200, username: 'friend' }
            const message = { _id: 1, sender: ownUser }
            expect(messageSentBySelf(ownUser, message)).toBeTruthy()
        })
    })

    describe('senderHasChanged()', () => {
        it('Returns true if sender of previous message is different from sender of current message', () => {
            const john = { _id: 1000, username: 'john' }
            const mary = { _id: 2000, username: 'mary' }
            const prevMessage = { _id: 1, sender: john }
            const currMessage = { _id: 2, sender: mary }
            expect(senderHasChanged(prevMessage, currMessage)).toBeTruthy()
        })

        it('Returns false if sender of previous message is same as sender of current message', () => {
            const john = { _id: 1000, username: 'john' }
            const mary = { _id: 2000, username: 'mary' }
            const prevMessage = { _id: 1, sender: john }
            const currMessage = { _id: 2, sender: john }
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
            const self = { _id: 100, username: 'myself' }
            const john = { _id: 200, username: 'john' }
            const mary = { _id: 200, username: 'mary' }
            const joe = { _id: 200, username: 'joe' }
            const allMessages = [
                { _id: 1, sender: self },
                { _id: 2, sender: john },
                { _id: 3, sender: mary },
                { _id: 4, sender: joe },
            ]
            const allChatBubbles = generateAllChatBubbles(self, allMessages)
            expect(allChatBubbles.length).toBe(allMessages.length)
        })
    })

    describe('generateSingleChatBubble()', () => {
    })

    describe('messageIsValid()', () => {
        it('Should return false for empty message', () => {
            const message = ''
            expect(messageIsValid(message)).toBeFalsy()
        })

        it('Should return false for message with length >300 characters', () => {
            const message = 'ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet'
            expect(messageIsValid(message)).toBeFalsy()
        })

        it('Should return true for message with 1 <= characters <= 300', () => {
            const message = 'Hello world!'
            expect(messageIsValid(message)).toBeTruthy()
        })
    })
})