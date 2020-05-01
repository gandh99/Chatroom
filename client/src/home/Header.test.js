import { shallow } from 'enzyme'
import React from 'react'
import Header from './Header'
import { AppBar, Toolbar } from '@material-ui/core'

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
    })
})