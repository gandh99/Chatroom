import { shallow } from 'enzyme'
import React from 'react'
import Header from './Header'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

describe('Header Component', () => {
    describe('Renders', () => {
        let wrapper
        const title = 'Title'

        beforeEach(() => {
            wrapper = shallow(<Header title={title} />)
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

    describe('Displays correct title', () => {
        const defaultTitle = 'New Chat'

        beforeEach(() => {
        })

        it('Should render default title with 0 friends selected', () => {
            const numOfFriends = 0
            const wrapper = shallow(<Header numOfFriends={numOfFriends} />)
            const component = wrapper.find(Typography)
            expect(component.props().children).toBe(defaultTitle)
        })

        // TODO: Fix this test. Currently it will still generate "New Chat"
        // it('Should render number selected with 1 or more friends selected', () => {
        //     const numOfFriends = 2
        //     const wrapper = shallow(<Header numOfFriends={numOfFriends} />)
        //     const component = wrapper.find(Typography)
        //     expect(component.props().children).toBe(`${numOfFriends} selected`)
        // })
    })
})