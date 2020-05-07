import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import { Grid, Fab } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import ChatsPage from './ChatsPage'
import ChatGroupCard from './ChatGroupCard'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('ChatsPage Component', () => {
    describe('Renders', () => {
        let wrapper
        const allChatGroups = []

        beforeEach(() => {
            spy.mockReturnValue(allChatGroups)
            redux.useDispatch.mockClear()
            wrapper = shallow(<ChatsPage />)
        })

        it('Should render grid', () => {
            const component = wrapper.find(Grid)
            expect(component.length).toBe(1)
        })

        it('Should render fab', () => {
            const component = wrapper.find(Fab)
            expect(component.length).toBe(1)
        })

        it('Should render chat icon', () => {
            const component = wrapper.find(ChatIcon)
            expect(component.length).toBe(1)
        })
    })

    describe('Renders ChatGroupCard', () => {
        let wrapper
        const allChatGroups = [
            {
                _id: 100,
                admins: [{ _id: 1, username: "mm" }],
                members: [{ _id: 2, username: "nn" }],
                messages: [200, 201],
                lastMessage: {
                    _id: 201,
                    text: "How are you?",
                    chatgroup: 100,
                    sender: 1,
                }
            }
        ]

        beforeEach(() => {
            spy.mockReturnValue(allChatGroups)
            redux.useDispatch.mockClear()
            wrapper = shallow(<ChatsPage />)
        })

        it('Should render the correct number of friend cards', () => {
            const component = wrapper.find(ChatGroupCard)
            expect(component.length).toBe(allChatGroups.length)
        })
    })
})