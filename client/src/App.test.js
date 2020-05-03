import App from './App'
import { shallow } from 'enzyme'
import { testStore } from './utils/utils'
import React from 'react'
import { PrivateRoute } from './reusableComponents/PrivateRoute'
import { Route } from 'react-router-dom'

// To test a connected component like App, we have to mock the store and dive into the App component itself
const setup = (initialState={}) => {
    const store = testStore(initialState)
    const wrapper = shallow(<App store={store} />).childAt(0).dive()   // Important!!
    return wrapper
}

describe('App Component', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<App />).childAt(0).dive()
        const initialState = {}
        wrapper = setup(initialState)
    })

    it('Should render without errors', () => {
        const component = wrapper.find('.App')
        expect(component.length).toBe(1)
    })

    it('Should render regular routes', () => {
        const component = wrapper.find(Route)
        expect(component.length).toBe(2)
    })

    it('Should render private routes', () => {
        const component = wrapper.find(PrivateRoute)
        expect(component.length).toBe(2)
    })
})