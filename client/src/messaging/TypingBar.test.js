import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import { useDispatch } from 'react-redux'
import TypingBar from './TypingBar'
import TextareaAutosize from 'react-autosize-textarea'
import SendIcon from '@material-ui/icons/Send'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('TypingBar Component', () => {
    describe('Renders', () => {
        let wrapper
        const currentChatGroup = {}
        const newChatGroupMembers = []

        beforeEach(() => {
            spy.mockReturnValue(currentChatGroup)
            spy.mockReturnValue(newChatGroupMembers)
            useDispatch.mockClear()
            wrapper = shallow(<TypingBar />)
        })

        it('Should render TextareaAutosize', () => {
            const component = wrapper.find(TextareaAutosize)
            expect(component.length).toBe(1)
        })

        it('Should render send icon', () => {
            const component = wrapper.find(SendIcon)
            expect(component.length).toBe(1)
        })
    })
})