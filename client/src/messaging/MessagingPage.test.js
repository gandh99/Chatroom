import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import { useDispatch } from 'react-redux'
import MessagingPage from './MessagingPage'
import Header from './Header'
import MessageDisplayArea from './MessageDisplayArea'
import TypingBar from './TypingBar'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('HomePage Component', () => {
    describe('Renders', () => {
        let wrapper
        const allMessages = []
        const currentChatGroup = {}

        beforeEach(() => {
            spy.mockReturnValue(allMessages)
            spy.mockReturnValue(currentChatGroup)
            useDispatch.mockClear()
            wrapper = shallow(<MessagingPage />)
        })

        it('Should render header', () => {
            const component = wrapper.find('header')
            expect(component.length).toBe(1)
        })

        it('Should render section', () => {
            const component = wrapper.find('section')
            expect(component.length).toBe(1)
        })

        it('Should render footer', () => {
            const component = wrapper.find('footer')
            expect(component.length).toBe(1)
        })

        it('Should render header component', () => {
            const component = wrapper.find(Header)
            expect(component.length).toBe(1)
        })

        it('Should render message display area component', () => {
            const component = wrapper.find(MessageDisplayArea)
            expect(component.length).toBe(1)
        })

        it('Should render custom snackbar', () => {
            const component = wrapper.find(CustomSnackbar)
            expect(component.length).toBe(1)
        })

        it('Should render typing bar', () => {
            const component = wrapper.find(TypingBar)
            expect(component.length).toBe(1)
        })
    })
})