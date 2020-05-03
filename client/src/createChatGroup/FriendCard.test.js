import { shallow } from 'enzyme'
import React from 'react'
import { useDispatch } from 'react-redux'
import FriendCard from './FriendCard'
import { Grid, Card, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useState: jest.fn()
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

        it('Should render empty checkbox by default', () => {
            const component = wrapper.find(CheckBoxOutlineBlankIcon)
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
    })

    describe('Toggles checkbox', () => {
        let wrapper

        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<FriendCard friend={friend} selectFriend={() => { }} unselectFriend={() => { }} />)
        })

        it('Should display only the filled checkbox when card is clicked once', () => {
            const component = wrapper.find(Card)
            component.simulate('click')

            expect(wrapper.find(CheckBoxIcon).length).toBe(1)
            expect(wrapper.find(CheckBoxOutlineBlankIcon).length).toBe(0)
        })

        it('Should display only the enpty checkbox when card is clicked twice', () => {
            /* Incorrect:
                const component = wrapper.find(Card)
                component.simulate('click')
                component.simulate('click')
            */
           
            // Correct:
            wrapper.find(Card).simulate('click')
            wrapper.find(Card).simulate('click')

            expect(wrapper.find(CheckBoxIcon).length).toBe(0)
            expect(wrapper.find(CheckBoxOutlineBlankIcon).length).toBe(1)
        })
    })
})