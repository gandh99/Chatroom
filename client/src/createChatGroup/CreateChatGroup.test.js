import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import { Grid, Fab, Button } from '@material-ui/core'
import CreateChatGroup from './CreateChatGroup'
import FriendCard from './FriendCard'
import Header from './Header'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('CreateChatGroup Component', () => {
    describe('Renders', () => {
        let wrapper
        const allFriends = []

        beforeEach(() => {
            spy.mockReturnValue(allFriends)
            redux.useDispatch.mockClear()
            wrapper = shallow(<CreateChatGroup />)
        })

        it('Should render header', () => {
            const component = wrapper.find(Header)
            expect(component.length).toBe(1)
        })

        it('Should render grid', () => {
            const component = wrapper.find(Grid)
            expect(component.length).toBe(1)
        })

        it('Should render button', () => {
            const component = wrapper.find(Button)
            expect(component.length).toBe(1)
        })
    })

    describe('Renders FriendCard', () => {
        let wrapper
        const allFriends = [
            {
                _id: 1,
                username: 'user1',
                personalMessage: 'Hi!'
            },
            {
                _id: 2,
                username: 'user2',
                personalMessage: 'Hi!'
            },
        ]

        beforeEach(() => {
            spy.mockReturnValue(allFriends)
            redux.useDispatch.mockClear()
            wrapper = shallow(<CreateChatGroup />)
        })

        it('Should render the correct number of friend cards', () => {
            const component = wrapper.find(FriendCard)
            expect(component.length).toBe(allFriends.length)
        })
    })

    describe('Renders the correct content', () => {
        let wrapper
        const allFriends = []

        beforeEach(() => {
            spy.mockReturnValue(allFriends)
            redux.useDispatch.mockClear()
            wrapper = shallow(<CreateChatGroup />)
        })

        it('Should render header', () => {
            const component = wrapper.find(Button)
            expect(component.props().children).toBe('Start Chat')
        })
    })
})