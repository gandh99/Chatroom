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

        it('Should render title', () => {
            const component = wrapper.find(Typography)
            expect(component.props().children).toBe(title)
        })
    })
})