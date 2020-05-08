import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import Header from './Header'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('Header Component', () => {
    describe('Renders', () => {
        let wrapper
        const ownUser = { _id: 1, username: 'myself' }
        const friend = { _id: 2, username: 'friend' }
        const newChatGroupMembers = [ownUser, friend]
        const currentChatGroup = [{ _id: 100 }]

        beforeEach(() => {
            spy.mockReturnValue(ownUser)
            spy.mockReturnValue(newChatGroupMembers)
            spy.mockReturnValue(currentChatGroup)
            redux.useDispatch.mockClear()
            wrapper = shallow(<Header />)
        })

        it('Should render app bar', () => {
            const component = wrapper.find(AppBar)
            expect(component.length).toBe(1)
        })

        it('Should render toolbar', () => {
            const component = wrapper.find(Toolbar)
            expect(component.length).toBe(1)
        })

        it('Should render typography', () => {
            const component = wrapper.find(Typography)
            expect(component.length).toBe(1)
        })

        it('Should render backspace icon', () => {
            const component = wrapper.find(KeyboardBackspaceIcon)
            expect(component.length).toBe(1)
        })
    })
})