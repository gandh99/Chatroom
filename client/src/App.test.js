import App from './App'
import { shallow } from 'enzyme'
// import { findByTestAttribute, testStore } from '../utils/index'
import React from 'react'

// To test a connected component like App, we have to mock the store and dive into the App component itself
// const setup = (initialState={}) => {
//     const store = testStore(initialState)
//     const wrapper = shallow(<App store={store} />).childAt(0).dive()   // Important!!
//     return wrapper
// }

describe('App Component', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<App />).childAt(0).dive()
        // const initialState = {
        //     posts: [
        //         {
        //             title: 'Example Title 1',
        //             body: 'Some text'
        //         },
        //         {
        //             title: 'Example Title 2',
        //             body: 'Some text'
        //         },
        //         {
        //             title: 'Example Title 3',
        //             body: 'Some text'
        //         },
        //     ]
        // }
        // wrapper = setup(initialState)
    })

    it('Should render without errors', () => {
        const component = wrapper.find('.App')
        expect(component.length).toBe(1)
    })

    it('Should render regular routes', () => {
        const component = wrapper.find('Route')
        expect(component.length).toBe(2)
    })

    it('Should render private route', () => {
        const component = wrapper.find('PrivateRoute')
        expect(component.length).toBe(1)
    })
})