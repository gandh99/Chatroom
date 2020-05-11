import { shallow } from 'enzyme'
import React from 'react'
import Header from './Header'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

describe('Header Component', () => {
    describe('Renders', () => {
        let wrapper

        beforeEach(() => {
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

        it('Should render exit to app icon', () => {
            const component = wrapper.find(ExitToAppIcon)
            expect(component.length).toBe(1)
        })
    })
})