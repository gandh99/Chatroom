import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import FriendsPage from './FriendsPage'
import AddFriendModal from './AddFriendModal'
import { Grid, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FriendCard from './FriendCard'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('FriendsPage Component', () => {
    describe('Renders', () => {
        let wrapper
        const allFriends = []

        beforeEach(() => {
            spy.mockReturnValue(allFriends)
            redux.useDispatch.mockClear()
            wrapper = shallow(<FriendsPage />)
        })

        it('Should render add friend modal', () => {
            const component = wrapper.find(AddFriendModal)
            expect(component.length).toBe(1)
        })

        it('Should render grid', () => {
            const component = wrapper.find(Grid)
            expect(component.length).toBe(1)
        })

        it('Should render fab', () => {
            const component = wrapper.find(Fab)
            expect(component.length).toBe(1)
        })

        it('Should render add icon', () => {
            const component = wrapper.find(AddIcon)
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
            wrapper = shallow(<FriendsPage />)
        })

        it('Should render the correct number of friend cards', () => {
            const component = wrapper.find(FriendCard)
            expect(component.length).toBe(allFriends.length)
        })
    })
})