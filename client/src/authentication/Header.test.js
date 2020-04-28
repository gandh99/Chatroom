import { shallow } from 'enzyme'
import React from 'react'
import Header from './Header'
import { Link } from "react-router-dom"

describe('Header Component', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<Header />).childAt(0).dive()
    })

    it('Should render links', () => {
        const component = wrapper.find(Link)
        expect(component.length).toBe(2)
    })

    it('Should render login and register links', () => {
        const components = wrapper.find(Link)
        const loginComponent = components.get(0)
        const registerComponent = components.get(1)

        expect(loginComponent.props.to).toEqual('/login')
        expect(registerComponent.props.to).toEqual('/register')
    })
})