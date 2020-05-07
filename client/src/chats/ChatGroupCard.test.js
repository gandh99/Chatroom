import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import { useDispatch } from 'react-redux'
import ChatGroupCard from './ChatGroupCard'
import { Grid, Card, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useState: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

const chatGroup = {
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

const ownUser = {
    id: 1,
    username: "username",
    personalMessage: "Hello!"
}

describe('ChatGroupCard Component', () => {
    describe('Renders', () => {
        let wrapper

        beforeEach(() => {
            spy.mockReturnValue(ownUser)
            useDispatch.mockClear()
            wrapper = shallow(<ChatGroupCard chatGroup={chatGroup} />)
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
    })
})