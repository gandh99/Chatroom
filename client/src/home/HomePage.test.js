import { shallow } from 'enzyme'
import React from 'react'
import { useDispatch } from 'react-redux'
import HomePage from './HomePage'
import Header from './Header'
import TabBar from './TabBar'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
}))

describe('HomePage Component', () => {
    describe('Renders', () => {
        let wrapper

        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<HomePage />)
        })

        it('Should render header', () => {
            const component = wrapper.find(Header)
            expect(component.length).toBe(1)
        })

        it('Should render custom snackbar', () => {
            const component = wrapper.find(CustomSnackbar)
            expect(component.length).toBe(1)
        })

        it('Should render tab bar', () => {
            const component = wrapper.find(TabBar)
            expect(component.length).toBe(1)
        })
    })
})