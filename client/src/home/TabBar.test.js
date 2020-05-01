import { shallow } from 'enzyme'
import React from 'react'
import TabBar from './TabBar'
import { Paper, Tabs, Tab } from '@material-ui/core'

describe('TabBar Component', () => {
    describe('Renders', () => {
        let wrapper

        beforeEach(() => {
            wrapper = shallow(<TabBar />)
        })

        it('Should render paper', () => {
            const component = wrapper.find(Paper)
            expect(component.length).toBe(1)
        })

        it('Should render tabs', () => {
            const component = wrapper.find(Tabs)
            expect(component.length).toBe(1)
        })

        it('Should render tab', () => {
            const component = wrapper.find(Tab)
            expect(component.length).toBe(3)
        })
    })
})