import { shallow } from 'enzyme'
import React from 'react'
import { useDispatch } from 'react-redux'
import FriendCard from './FriendCard'
import { Grid, Card, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
}))

const friend = {
    _id: 1,
    username: 'user1',
    personalMessage: 'Hello!'
}

describe('FriendCard Component', () => {
    describe('Renders', () => {
        let wrapper

        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<FriendCard friend={friend} />)
        })

        it('Should render grid', () => {
            const component = wrapper.find(Grid)
            expect(component.length).toBe(1)
        })

        it('Should render card', () => {
            const component = wrapper.find(Card)
            expect(component.length).toBe(1)
        })

        it('Should render card content', () => {
            const component = wrapper.find(CardContent)
            expect(component.length).toBe(1)
        })

        it('Should render typography', () => {
            const component = wrapper.find(Typography)
            expect(component.length).toBe(2)
        })

        it('Should render menu', () => {
            const component = wrapper.find(Menu)
            expect(component.length).toBe(1)
        })

        it('Should render menu item', () => {
            const component = wrapper.find(MenuItem)
            expect(component.length).toBe(1)
        })

        it('Should render vertical icon', () => {
            const component = wrapper.find(MoreVertIcon)
            expect(component.length).toBe(1)
        })
    })

    describe('Displays correct content', () => {
        let wrapper

        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<FriendCard friend={friend} />)
        })

        it('Should display username', () => {
            const component = wrapper.find(Typography).at(0)
            expect(component.props().children).toBe(friend.username)
        })

        it('Should display personal message', () => {
            const component = wrapper.find(Typography).at(1)
            expect(component.props().children).toBe(friend.personalMessage)
        })

        it('Should display menu item text', () => {
            const component = wrapper.find(MenuItem)
            expect(component.props().children).toBe('Delete Friend')
        })
    })
})